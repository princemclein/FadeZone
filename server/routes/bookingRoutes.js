
const express = require("express");
const router = express.Router();
const db = require("../config/db");
const uploadReceipt = require("../middleware/uploadReceipt");
const fs = require("fs");
const crypto = require("crypto");

const HAIRCUT_PRICE = 150;
const DOWNPAYMENT_AMOUNT = 60;
const REMAINING_BALANCE = 90;
const RESERVATION_MINUTES = 90;

const createError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

// GET booking API status
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Booking API is running!",
  });
});

// Convert frontend time (02:00 PM) into MySQL time (14:00:00)
const convertTime = (timeSlot) => {
  const match = timeSlot.match(
    /^(0?[1-9]|1[0-2]):([0-5]\d)\s?(AM|PM)$/i
  );

  if (!match) return null;

  let hours = Number(match[1]);
  const minutes = Number(match[2]);
  const period = match[3].toUpperCase();

  if (period === "PM" && hours !== 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;

  // Only allow 30-minute intervals
  if (minutes !== 0 && minutes !== 30) return null;

  // Shop hours: 7:00 AM to 9:00 PM
  // Last available starting time: 7:30 PM
  if (hours < 7 || hours > 19 || (hours === 19 && minutes > 30)) {
    return null;
  }

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00`;
};

// Validate booking date
const isValidDate = (date) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return false;

  const parsedDate = new Date(`${date}T00:00:00Z`);

  return (
    !Number.isNaN(parsedDate.getTime()) &&
    parsedDate.toISOString().slice(0, 10) === date
  );
};

// Check whether a barber has an overlapping booking
const isBarberAvailable = async (
  connection,
  barberId,
  bookingDate,
  bookingTime
) => {
  const requestedStart = `${bookingDate} ${bookingTime}`;

  const [conflicts] = await connection.execute(
    `SELECT id
     FROM bookings
     WHERE barber_id = ?
       AND status IN (
         'pending',
         'approved',
         'in_progress',
         'completed'
       )
       AND TIMESTAMP(booking_date, booking_time)
           < DATE_ADD(?, INTERVAL ? MINUTE)
       AND COALESCE(
         CASE
           WHEN status = 'completed' THEN completed_at
           ELSE NULL
         END,
         DATE_ADD(
           TIMESTAMP(booking_date, booking_time),
           INTERVAL reservation_minutes MINUTE
         )
       ) > ?
     LIMIT 1`,
    [
      barberId,
      requestedStart,
      RESERVATION_MINUTES,
      requestedStart,
    ]
  );

  return conflicts.length === 0;
};

// Generate a unique booking ticket
const generateBookingCode = () => {
  return `FZ-${crypto.randomInt(1000, 10000)}`;
};

router.get("/all", async (req, res) => {
  try {
    const [bookings] = await db.query(`
      SELECT
        b.*,
        barbers.full_name AS barber_name,
        barbers.chair_label AS barber_chair
      FROM bookings b
      LEFT JOIN barbers
        ON b.barber_id = barbers.id
      ORDER BY b.created_at DESC
    `);

    res.status(200).json({
      success: true,
      data: bookings,
    });
  } catch (error) {
    console.error("Error fetching bookings:", error);

    res.status(500).json({
      success: false,
      message: "Unable to retrieve bookings.",
    });
  }
});

// POST create booking
router.post("/", uploadReceipt, async (req, res) => {
  let connection;
  let transactionStarted = false;
  let bookingSaved = false;

  try {
    const {
      fullName,
      phone,
      haircutStyle,
      barberId,
      date,
      timeSlot,
      notes,
      gcashRef,
    } = req.body;

    // 1. Validate customer information
    const customerName = fullName?.trim();
    const customerMobile = phone?.trim();
    const selectedHaircut = haircutStyle?.trim();
    const customerNotes = notes?.trim() || null;
    const paymentReference = gcashRef?.trim() || null;

    if (
      !customerName ||
      !customerMobile ||
      !selectedHaircut ||
      !barberId ||
      !date ||
      !timeSlot
    ) {
      throw createError("Please complete all required booking fields.", 400);
    }

    if (customerName.length > 100) {
      throw createError("Customer name is too long.", 400);
    }

    if (customerMobile.length > 20) {
      throw createError("Mobile number is too long.", 400);
    }

    if (selectedHaircut.length > 100) {
      throw createError("Haircut style is too long.", 400);
    }

    if (customerNotes && customerNotes.length > 2000) {
      throw createError("Customer notes are too long.", 400);
    }

    if (paymentReference && paymentReference.length > 100) {
      throw createError("GCash reference is too long.", 400);
    }

    // 2. Validate date and time
    if (!isValidDate(date)) {
      throw createError("Invalid booking date.", 400);
    }

    const bookingTime = convertTime(timeSlot);

    if (!bookingTime) {
      throw createError("Invalid booking time slot.", 400);
    }

    if (!req.file) {
      throw createError("A GCash receipt image is required.", 400);
    }

    // 3. Start database transaction
    connection = await db.getConnection();

    await connection.beginTransaction();
    transactionStarted = true;

    // 4. Lock barber records to prevent concurrent booking conflicts
    let availableBarbers = [];

    if (barberId === "any") {
      const [barbers] = await connection.execute(
        `SELECT id
         FROM barbers
         WHERE is_active = TRUE
         ORDER BY id
         FOR UPDATE`
      );

      availableBarbers = barbers;
    } else {
      const selectedId = Number(barberId);

      if (!Number.isSafeInteger(selectedId) || selectedId <= 0) {
        throw createError("Invalid barber selection.", 400);
      }

      const [barbers] = await connection.execute(
        `SELECT id
         FROM barbers
         WHERE id = ? AND is_active = TRUE
         FOR UPDATE`,
        [selectedId]
      );

      if (barbers.length === 0) {
        throw createError("Selected barber is unavailable.", 404);
      }

      availableBarbers = barbers;
    }

    // 5. Find an available barber
    let assignedBarberId = null;

    for (const barber of availableBarbers) {
      const available = await isBarberAvailable(
        connection,
        barber.id,
        date,
        bookingTime
      );

      if (available) {
        assignedBarberId = barber.id;
        break;
      }
    }

    if (!assignedBarberId) {
      throw createError(
        "No barber is available for the selected time slot.",
        409
      );
    }

    // 6. Generate a unique booking code and insert booking
    let bookingCode;
    let inserted = false;

    for (let attempt = 0; attempt < 10; attempt++) {
      bookingCode = generateBookingCode();

      try {
        await connection.execute(
          `INSERT INTO bookings (
            booking_code,
            customer_name,
            customer_mobile,
            barber_id,
            preferred_barber,
            haircut_style,
            booking_date,
            booking_time,
            reservation_minutes,
            customer_notes,
            haircut_price,
            downpayment_amount,
            remaining_balance,
            gcash_reference,
            receipt_path,
            status
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            bookingCode,
            customerName,
            customerMobile,
            assignedBarberId,
            barberId !== "any",
            selectedHaircut,
            date,
            bookingTime,
            RESERVATION_MINUTES,
            customerNotes,
            HAIRCUT_PRICE,
            DOWNPAYMENT_AMOUNT,
            REMAINING_BALANCE,
            paymentReference,
            req.file.receiptPath,
            "pending",
          ]
        );

        inserted = true;
        break;
      } catch (error) {
        if (error.code !== "ER_DUP_ENTRY") {
          throw error;
        }
      }
    }

    if (!inserted) {
      throw createError(
        "Unable to generate a booking ticket. Please try again.",
        500
      );
    }

    // 7. Commit transaction
    await connection.commit();
    bookingSaved = true;

    return res.status(201).json({
      success: true,
      message: "Booking submitted successfully!",
      data: {
        bookingCode,
        barberId: assignedBarberId,
        bookingDate: date,
        bookingTime,
        reservationMinutes: RESERVATION_MINUTES,
        haircutPrice: HAIRCUT_PRICE,
        downpaymentAmount: DOWNPAYMENT_AMOUNT,
        remainingBalance: REMAINING_BALANCE,
        status: "pending",
      },
    });
  } catch (error) {
    if (connection && transactionStarted) {
      await connection.rollback();
    }

    console.error("Booking creation error:", error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.statusCode
        ? error.message
        : "Unable to create booking. Please try again.",
    });
  } finally {
    if (connection) {
      connection.release();
    }

    // Remove uploaded receipt if the booking was not saved
    if (!bookingSaved && req.file?.path) {
      try {
        await fs.promises.unlink(req.file.path);
      } catch (error) {
        if (error.code !== "ENOENT") {
          console.error("Receipt cleanup error:", error);
        }
      }
    }
  }
});

module.exports = router;
