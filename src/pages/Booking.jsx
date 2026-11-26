
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Container from "../components/Container";

const API_URL = import.meta.env.VITE_API_URL;

const TOTAL_PRICE = 150;
const DOWNPAYMENT_RATE = 0.4;
const DOWNPAYMENT_AMOUNT = TOTAL_PRICE * DOWNPAYMENT_RATE;
const BALANCE_AMOUNT = TOTAL_PRICE - DOWNPAYMENT_AMOUNT;

// Current reservation setting: 90 minutes.
// Last available start time is 7:30 PM to finish by 9:00 PM.
const RESERVATION_MINUTES = 90;

function generateTimeSlots() {
  const slots = [];

  const startMinutes = 7 * 60;
  const closingMinutes = 21 * 60;
  const lastStartMinutes = closingMinutes - RESERVATION_MINUTES;

  for (
    let minutes = startMinutes;
    minutes <= lastStartMinutes;
    minutes += 30
  ) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    const period = hours >= 12 ? "PM" : "AM";
    const displayHour = hours % 12 || 12;

    slots.push(
      `${String(displayHour).padStart(2, "0")}:${String(
        remainingMinutes,
      ).padStart(2, "0")} ${period}`,
    );
  }

  return slots;
}

const TIME_SLOTS = generateTimeSlots();

function getTodayString() {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  const local = new Date(now.getTime() - offset * 60 * 1000);

  return local.toISOString().split("T")[0];
}

function formatReadableDate(dateStr) {
  if (!dateStr) return "Select Date";

  const [year, month, day] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatBarberName(barber) {
  return (
    barber.display_name ||
    `${barber.full_name}${barber.chair_label ? ` - ${barber.chair_label}` : ""}`
  );
}

export default function Booking() {
  const today = getTodayString();

  // Step control: details | payment | submitted
  const [step, setStep] = useState("details");

  // Appointment details
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [haircutStyle, setHaircutStyle] = useState("");

  // Barber data from API
  const [barbers, setBarbers] = useState([]);
  const [barberId, setBarberId] = useState("any");
  const [barbersLoading, setBarbersLoading] = useState(true);
  const [barberLoadError, setBarberLoadError] = useState("");

  const [date, setDate] = useState(today);
  const [timeSlot, setTimeSlot] = useState("02:00 PM");
  const [notes, setNotes] = useState("");

  // GCash receipt details
  const [receiptFile, setReceiptFile] = useState(null);
  const [receiptPreview, setReceiptPreview] = useState(null);
  const [gcashRef, setGcashRef] = useState("");

  const [error, setError] = useState("");
  const [ticketCode, setTicketCode] = useState(null);

  // Resolve the selected barber's display name.
  const selectedBarber = barbers.find(
    (barber) => String(barber.id) === String(barberId),
  );

  const selectedBarberName =
    barberId === "any"
      ? "Any Available Barber"
      : selectedBarber
        ? formatBarberName(selectedBarber)
        : "Select a Barber";

  // Fetch active barbers from the backend.
  useEffect(() => {
    let isMounted = true;

    async function fetchBarbers() {
      try {
        const response = await fetch(`${API_URL}/barbers`);
        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || "Failed to load barbers.");
        }

        if (isMounted) {
          setBarbers(result.data || []);
          setBarberLoadError("");
        }
      } catch (error) {
        console.error("Failed to fetch barbers:", error);

        if (isMounted) {
          setBarberLoadError(
            "Unable to load barbers. Please refresh the page.",
          );
        }
      } finally {
        if (isMounted) {
          setBarbersLoading(false);
        }
      }
    }

    fetchBarbers();

    return () => {
      isMounted = false;
    };
  }, []);

  function handleProceedToPayment(e) {
    e.preventDefault();

    if (!fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!phone.trim()) {
      setError("Please enter your mobile number.");
      return;
    }

    if (!haircutStyle.trim()) {
      setError("Please enter the haircut style you want.");
      return;
    }

    if (!date || !timeSlot) {
      setError("Please select a preferred date and time.");
      return;
    }

    if (barbersLoading) {
      setError("Please wait while we load the available barbers.");
      return;
    }

    if (barberLoadError) {
      setError("Unable to load barbers. Please refresh the page.");
      return;
    }

    if (barberId !== "any" && !selectedBarber) {
      setError("Please select a valid barber.");
      return;
    }

    setError("");
    setStep("payment");

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleFileChange(e) {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image screenshot (JPG, PNG, or WEBP).");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Screenshot must be smaller than 5MB.");
      e.target.value = "";
      return;
    }

    if (receiptPreview) {
      URL.revokeObjectURL(receiptPreview);
    }

    setError("");
    setReceiptFile(file);
    setReceiptPreview(URL.createObjectURL(file));
  }

  function handleRemoveReceipt() {
    if (receiptPreview) {
      URL.revokeObjectURL(receiptPreview);
    }

    setReceiptFile(null);
    setReceiptPreview(null);
  }

  function handleFinalSubmit(e) {
    e.preventDefault();

    if (!receiptFile) {
      setError("Please upload a screenshot of your ₱60 GCash payment receipt.");
      return;
    }

    if (gcashRef.trim().length > 100) {
      setError("The GCash reference number is too long.");
      return;
    }

    setError("");

    // Temporary frontend preview only.
    // Actual booking submission will be connected to POST /api/bookings.
    const randomNum = Math.floor(1000 + Math.random() * 9000);

    setTicketCode(`FZ-${randomNum}`);
    setStep("submitted");

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleReset() {
    handleRemoveReceipt();

    setTicketCode(null);
    setFullName("");
    setPhone("");
    setHaircutStyle("");
    setBarberId("any");
    setDate(today);
    setTimeSlot("02:00 PM");
    setGcashRef("");
    setNotes("");
    setError("");
    setStep("details");
  }

  return (
    <main className="min-h-screen border-t border-fadezone-accent/30 bg-fadezone-texture py-14 text-fadezone-text sm:py-20 lg:py-24">
      <Container>
        {/* Breadcrumb */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-dashed border-fadezone-text/25 pb-5">
          <Link
            to="/"
            className="group inline-flex items-center gap-2.5 font-body text-xs font-bold uppercase tracking-[0.22em] text-fadezone-text/80 transition-colors hover:text-fadezone-accent"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">
              ←
            </span>
            <span>Back to Shop</span>
          </Link>

          <span className="font-body text-[11px] font-bold uppercase tracking-[0.25em] text-fadezone-accent">
            40% GCASH DOWNPAYMENT REQUIRED (₱{DOWNPAYMENT_AMOUNT})
          </span>
        </div>

        {/* Header */}
        <div className="flex flex-col justify-between gap-6 border-b border-fadezone-text/15 pb-10 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-fadezone-accent" />

              <p className="font-body text-xs font-bold uppercase tracking-[0.3em] text-fadezone-accent">
                Dispatch Desk • Subic, Zambales
              </p>
            </div>

            <h1 className="font-heading text-4xl uppercase leading-[0.95] text-fadezone-text sm:text-5xl md:text-6xl">
              Book Your <span className="text-fadezone-accent">Chair.</span>
            </h1>
          </div>

          <p className="max-w-md font-body text-sm leading-7 text-fadezone-text/75 lg:text-right">
            All cuts are ₱{TOTAL_PRICE}. A 40% downpayment (₱
            {DOWNPAYMENT_AMOUNT}) via GCash holds your slot—pay the remaining ₱
            {BALANCE_AMOUNT} at the shop.
          </p>
        </div>

     
        {/* Step Indicator */}
        <div className="mx-auto mt-8 grid max-w-3xl grid-cols-3 items-center border border-fadezone-accent/35 bg-fadezone-surface/80 px-2 py-3 sm:px-6">
          {/* Step 1 */}
          <div className="flex min-w-0 flex-col items-center gap-1.5 sm:flex-row sm:justify-center sm:gap-2">
            <span
              className={`flex h-6 w-6 shrink-0 items-center justify-center border font-body text-xs font-bold ${
                step === "details"
                  ? "border-fadezone-accent bg-fadezone-accent text-fadezone-text"
                  : "border-fadezone-accent/60 text-fadezone-accent"
              }`}
            >
              1
            </span>

            <span className="text-center font-body text-[9px] font-bold uppercase leading-tight tracking-[0.08em] sm:text-[11px] sm:tracking-[0.18em]">
              Details
            </span>
          </div>

          {/* Step 2 */}
          <div className="flex min-w-0 flex-col items-center gap-1.5 sm:flex-row sm:justify-center sm:gap-2">
            <span
              className={`flex h-6 w-6 shrink-0 items-center justify-center border font-body text-xs font-bold ${
                step === "payment"
                  ? "border-fadezone-accent bg-fadezone-accent text-fadezone-text"
                  : step === "submitted"
                    ? "border-fadezone-accent/60 text-fadezone-accent"
                    : "border-fadezone-text/30 text-fadezone-text/50"
              }`}
            >
              2
            </span>

            <span
              className={`text-center font-body text-[9px] font-bold uppercase leading-tight tracking-[0.08em] sm:text-[11px] sm:tracking-[0.18em] ${
                step === "details"
                  ? "text-fadezone-text/50"
                  : "text-fadezone-text"
              }`}
            >
              GCash Receipt
            </span>
          </div>

          {/* Step 3 */}
          <div className="flex min-w-0 flex-col items-center gap-1.5 sm:flex-row sm:justify-center sm:gap-2">
            <span
              className={`flex h-6 w-6 shrink-0 items-center justify-center border font-body text-xs font-bold ${
                step === "submitted"
                  ? "border-fadezone-accent bg-fadezone-accent text-fadezone-text"
                  : "border-fadezone-text/30 text-fadezone-text/50"
              }`}
            >
              3
            </span>

            <span
              className={`max-w-full text-center font-body text-[9px] font-bold uppercase leading-tight tracking-[0.08em] sm:text-[11px] sm:tracking-[0.18em] ${
                step === "submitted"
                  ? "text-fadezone-text"
                  : "text-fadezone-text/50"
              }`}
            >
              Approval Stub
            </span>
          </div>
        </div>


        {/* STEP 3: SUBMITTED PREVIEW */}
        {step === "submitted" && ticketCode && (
          <div className="mx-auto mt-10 max-w-2xl">
            <div className="relative border border-fadezone-accent bg-fadezone-surface p-6 text-fadezone-text sm:p-10">
              <span className="pointer-events-none absolute top-3 left-3 h-3.5 w-3.5 border-t border-l border-fadezone-accent" />
              <span className="pointer-events-none absolute top-3 right-3 h-3.5 w-3.5 border-t border-r border-fadezone-accent" />
              <span className="pointer-events-none absolute bottom-3 left-3 h-3.5 w-3.5 border-b border-l border-fadezone-accent" />
              <span className="pointer-events-none absolute bottom-3 right-3 h-3.5 w-3.5 border-b border-r border-fadezone-accent" />

              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-dashed border-fadezone-text/25 pb-4">
                <span className="border border-amber-400/50 bg-amber-500/15 px-2.5 py-1 font-body text-[11px] font-bold uppercase tracking-[0.22em] text-amber-300">
                  ● DEMO SUBMISSION
                </span>

                <span className="border border-fadezone-accent/60 bg-fadezone-background px-3 py-1 font-body text-xs font-bold uppercase tracking-[0.22em] text-fadezone-accent">
                  TICKET #{ticketCode}
                </span>
              </div>

              <h2 className="mt-6 font-heading text-3xl uppercase tracking-wide sm:text-4xl">
                Receipt Received,{" "}
                <span className="text-fadezone-accent">{fullName}.</span>
              </h2>

              <p className="mt-2 font-body text-sm leading-7 text-fadezone-text/75">
                This is currently a frontend preview. Your booking has not yet
                been saved to the database or submitted to the shop.
              </p>

              <div className="my-6 border-t border-dashed border-fadezone-text/25" />

              <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="border border-fadezone-text/15 bg-fadezone-background/60 p-3.5">
                  <dt className="font-body text-[10px] font-bold uppercase tracking-[0.22em] text-fadezone-text/60">
                    Requested Style
                  </dt>

                  <dd className="mt-1 font-heading text-xl uppercase tracking-wide">
                    {haircutStyle}
                  </dd>
                </div>

                <div className="border border-fadezone-text/15 bg-fadezone-background/60 p-3.5">
                  <dt className="font-body text-[10px] font-bold uppercase tracking-[0.22em] text-fadezone-text/60">
                    Barber Preference
                  </dt>

                  <dd className="mt-1 font-heading text-xl uppercase tracking-wide">
                    {selectedBarberName}
                  </dd>
                </div>

                <div className="border border-fadezone-text/15 bg-fadezone-background/60 p-3.5">
                  <dt className="font-body text-[10px] font-bold uppercase tracking-[0.22em] text-fadezone-text/60">
                    Date & Time
                  </dt>

                  <dd className="mt-1 font-body text-xs font-bold uppercase tracking-[0.18em] text-fadezone-accent">
                    {formatReadableDate(date)} • {timeSlot}
                  </dd>
                </div>

                <div className="border border-fadezone-text/15 bg-fadezone-background/60 p-3.5">
                  <dt className="font-body text-[10px] font-bold uppercase tracking-[0.22em] text-fadezone-text/60">
                    Payment Breakdown
                  </dt>

                  <dd className="mt-1 font-body text-xs font-bold uppercase tracking-[0.18em]">
                    ₱{DOWNPAYMENT_AMOUNT} Sent • ₱{BALANCE_AMOUNT} Due at Shop
                  </dd>
                </div>
              </dl>

              {receiptPreview && (
                <div className="mt-5 flex items-center gap-4 border border-dashed border-fadezone-text/25 bg-fadezone-background/40 p-3.5">
                  <img
                    src={receiptPreview}
                    alt="Uploaded GCash receipt"
                    className="h-16 w-14 shrink-0 border border-fadezone-accent/40 object-cover"
                  />

                  <div>
                    <p className="font-body text-[11px] font-bold uppercase tracking-[0.2em] text-fadezone-accent">
                      Screenshot Attached
                    </p>

                    <p className="mt-0.5 font-body text-xs text-fadezone-text/75">
                      {receiptFile?.name}
                      {gcashRef.trim() ? ` • Ref: ${gcashRef.trim()}` : ""}
                    </p>
                  </div>
                </div>
              )}

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/"
                  className="group flex flex-1 items-center justify-center gap-3 border border-fadezone-accent bg-fadezone-accent px-6 py-3.5 font-body text-xs font-bold uppercase tracking-[0.2em] text-fadezone-text transition-colors hover:bg-fadezone-background hover:text-fadezone-accent"
                >
                  <span>Return Home</span>

                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>

                <button
                  type="button"
                  onClick={handleReset}
                  className="border border-fadezone-text/30 bg-fadezone-background/60 px-6 py-3.5 font-body text-xs font-bold uppercase tracking-[0.2em] text-fadezone-text transition-colors hover:border-fadezone-accent hover:text-fadezone-accent"
                >
                  Book Another Slot
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 1: APPOINTMENT DETAILS */}
        {step === "details" && (
          <div className="mx-auto mt-10 max-w-3xl">
            <form
              onSubmit={handleProceedToPayment}
              noValidate
              className="relative border border-fadezone-accent/50 bg-fadezone-surface/95 p-6 sm:p-10"
            >
              <span className="pointer-events-none absolute top-3 left-3 h-3 w-3 border-t border-l border-fadezone-accent" />
              <span className="pointer-events-none absolute top-3 right-3 h-3 w-3 border-t border-r border-fadezone-accent" />
              <span className="pointer-events-none absolute bottom-3 left-3 h-3 w-3 border-b border-l border-fadezone-accent" />
              <span className="pointer-events-none absolute bottom-3 right-3 h-3 w-3 border-b border-r border-fadezone-accent" />

              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-dashed border-fadezone-text/25 pb-4">
                <span className="font-body text-xs font-bold uppercase tracking-[0.25em] text-fadezone-accent">
                  Step 01 • Appointment Details
                </span>

                <span className="font-body text-[11px] uppercase tracking-[0.2em] text-fadezone-text/60">
                  Open Daily • 7:00 AM – 9:00 PM
                </span>
              </div>

              <div className="mt-7 space-y-6">
                {/* Name and Phone */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="client-name"
                      className="block font-body text-xs font-bold uppercase tracking-[0.2em] text-fadezone-text/80"
                    >
                      Full Name *
                    </label>

                    <input
                      id="client-name"
                      type="text"
                      maxLength={100}
                      autoComplete="name"
                      placeholder="LastName, FirstName"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="mt-2 w-full border border-fadezone-text/25 bg-fadezone-background px-4 py-3 font-body text-sm text-fadezone-text placeholder:text-fadezone-text/35 focus:border-fadezone-accent focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="client-phone"
                      className="block font-body text-xs font-bold uppercase tracking-[0.2em] text-fadezone-text/80"
                    >
                      Mobile Number *
                    </label>

                    <input
                      id="client-phone"
                      type="tel"
                      maxLength={20}
                      autoComplete="tel"
                      placeholder="0912 345 6789"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="mt-2 w-full border border-fadezone-text/25 bg-fadezone-background px-4 py-3 font-body text-sm text-fadezone-text placeholder:text-fadezone-text/35 focus:border-fadezone-accent focus:outline-none"
                    />
                  </div>
                </div>

                {/* Haircut and Barber */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="haircut-style"
                      className="block font-body text-xs font-bold uppercase tracking-[0.2em] text-fadezone-text/80"
                    >
                      Haircut / Style *
                    </label>

                    <input
                      id="haircut-style"
                      type="text"
                      maxLength={100}
                      placeholder="e.g. Mid Fade, Buzz Cut, Taper..."
                      value={haircutStyle}
                      onChange={(e) => setHaircutStyle(e.target.value)}
                      className="mt-2 w-full border border-fadezone-text/25 bg-fadezone-background px-4 py-3 font-body text-sm text-fadezone-text placeholder:text-fadezone-text/35 focus:border-fadezone-accent focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="barber-select"
                      className="block font-body text-xs font-bold uppercase tracking-[0.2em] text-fadezone-text/80"
                    >
                      Preferred Barber
                    </label>

                    <select
                      id="barber-select"
                      value={barberId}
                      onChange={(e) => setBarberId(e.target.value)}
                      disabled={barbersLoading || Boolean(barberLoadError)}
                      className="mt-2 w-full border border-fadezone-text/25 bg-fadezone-background px-4 py-3 font-body text-sm text-fadezone-text focus:border-fadezone-accent focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="any">Any Available Barber</option>

                      {barbers.map((barber) => (
                        <option key={barber.id} value={String(barber.id)}>
                          {formatBarberName(barber)}
                        </option>
                      ))}
                    </select>

                    {barbersLoading && (
                      <p className="mt-2 font-body text-[10px] uppercase tracking-[0.15em] text-fadezone-text/55">
                        Loading barbers...
                      </p>
                    )}

                    {barberLoadError && (
                      <p className="mt-2 font-body text-xs text-red-400">
                        {barberLoadError}
                      </p>
                    )}
                  </div>
                </div>

                {/* Date and Time */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="booking-date"
                      className="block font-body text-xs font-bold uppercase tracking-[0.2em] text-fadezone-text/80"
                    >
                      Preferred Date *
                    </label>

                    <input
                      id="booking-date"
                      type="date"
                      min={today}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="mt-2 w-full border border-fadezone-text/25 bg-fadezone-background px-4 py-3 font-body text-sm text-fadezone-text focus:border-fadezone-accent focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="booking-time"
                      className="block font-body text-xs font-bold uppercase tracking-[0.2em] text-fadezone-text/80"
                    >
                      Preferred Time *
                    </label>

                    <select
                      id="booking-time"
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      className="mt-2 w-full border border-fadezone-text/25 bg-fadezone-background px-4 py-3 font-body text-sm text-fadezone-text focus:border-fadezone-accent focus:outline-none"
                    >
                      {TIME_SLOTS.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label
                    htmlFor="client-notes"
                    className="block font-body text-xs font-bold uppercase tracking-[0.2em] text-fadezone-text/80"
                  >
                    Notes / Instructions (Optional)
                  </label>

                  <textarea
                    id="client-notes"
                    rows={3}
                    maxLength={2000}
                    placeholder="Guard size, lineup preference, or any extra details..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="mt-2 w-full border border-fadezone-text/25 bg-fadezone-background px-4 py-3 font-body text-sm text-fadezone-text placeholder:text-fadezone-text/35 focus:border-fadezone-accent focus:outline-none"
                  />
                </div>
              </div>

              {error && (
                <p
                  role="alert"
                  className="mt-6 border border-fadezone-accent bg-fadezone-background/80 px-4 py-3 font-body text-xs font-bold text-fadezone-accent"
                >
                  {error}
                </p>
              )}

              <div className="mt-8 flex flex-col items-start justify-between gap-5 border-t border-dashed border-fadezone-text/25 pt-6 sm:flex-row sm:items-center">
                <div>
                  <span className="font-body text-[10px] font-bold uppercase tracking-[0.22em] text-fadezone-text/60">
                    40% GCash Downpayment • ₱{TOTAL_PRICE} Total
                  </span>

                  <p className="font-heading text-3xl tracking-wide text-fadezone-accent">
                    ₱{DOWNPAYMENT_AMOUNT}{" "}
                    <span className="font-body text-xs uppercase tracking-[0.16em] text-fadezone-text/65">
                      Due Now
                    </span>
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={barbersLoading || Boolean(barberLoadError)}
                  className="group flex w-full items-center justify-center gap-3 border border-fadezone-accent bg-fadezone-accent px-8 py-4 font-body text-xs font-bold uppercase tracking-[0.22em] text-fadezone-text transition-colors hover:bg-fadezone-background hover:text-fadezone-accent disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                >
                  <span>Proceed to GCash QR</span>

                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* STEP 2: GCASH PAYMENT */}
        {step === "payment" && (
          <div className="mx-auto mt-10 max-w-3xl">
            <form
              onSubmit={handleFinalSubmit}
              noValidate
              className="relative border border-fadezone-accent/60 bg-fadezone-surface/95 p-6 sm:p-10"
            >
              <span className="pointer-events-none absolute top-3 left-3 h-3 w-3 border-t border-l border-fadezone-accent" />
              <span className="pointer-events-none absolute top-3 right-3 h-3 w-3 border-t border-r border-fadezone-accent" />
              <span className="pointer-events-none absolute bottom-3 left-3 h-3 w-3 border-b border-l border-fadezone-accent" />
              <span className="pointer-events-none absolute bottom-3 right-3 h-3 w-3 border-b border-r border-fadezone-accent" />

              {/* Payment Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-dashed border-fadezone-text/25 pb-4">
                <button
                  type="button"
                  onClick={() => {
                    setError("");
                    setStep("details");
                  }}
                  className="font-body text-xs font-bold uppercase tracking-[0.2em] text-fadezone-text/80 transition-colors hover:text-fadezone-accent"
                >
                  ← Edit Details
                </button>

                <span className="font-body text-[11px] font-bold uppercase tracking-[0.22em] text-fadezone-accent">
                  Step 02 • Verify Downpayment
                </span>
              </div>

              {/* Booking Summary */}
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border border-fadezone-text/15 bg-fadezone-background/70 px-4 py-3">
                <div>
                  <p className="font-heading text-lg uppercase tracking-wide">
                    {haircutStyle} • {selectedBarberName}
                  </p>

                  <p className="font-body text-[11px] uppercase tracking-[0.18em] text-fadezone-text/65">
                    {formatReadableDate(date)} at {timeSlot} ({fullName})
                  </p>
                </div>

                <div className="text-right">
                  <span className="block font-body text-[10px] font-bold uppercase tracking-[0.2em] text-fadezone-text/60">
                    Pay Via GCash
                  </span>

                  <span className="font-heading text-2xl text-fadezone-accent">
                    ₱{DOWNPAYMENT_AMOUNT}.00
                  </span>
                </div>
              </div>

              {/* QR and Receipt */}
              <div className="mt-7 grid grid-cols-1 gap-8 md:grid-cols-2">
                {/* GCash QR */}
                <div className="flex flex-col items-center border border-fadezone-accent/40 bg-fadezone-background/80 p-5 text-center">
                  <span className="font-body text-[11px] font-bold uppercase tracking-[0.25em] text-sky-400">
                    GCash Express Send
                  </span>

                  <div className="mt-4 flex aspect-square w-52 items-center justify-center border-2 border-dashed border-sky-400/60 bg-white p-3 text-neutral-900">
                    <div className="space-y-1.5">
                      <p className="font-heading text-xl uppercase tracking-wider text-sky-600">
                        GCASH QR
                      </p>

                      <p className="font-body text-[11px] font-bold uppercase tracking-wider text-neutral-700">
                        FadeZone Barbershop
                      </p>

                      <p className="font-body text-[10px] text-neutral-500">
                        Scan to pay ₱{DOWNPAYMENT_AMOUNT}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 w-full border-t border-dashed border-fadezone-text/20 pt-3">
                    <p className="font-body text-xs font-bold uppercase tracking-[0.18em] text-fadezone-text">
                      FadeZone Subic
                    </p>

                    <p className="mt-0.5 font-body text-xs tracking-[0.18em] text-fadezone-accent">
                      0917 000 0000
                    </p>

                    <p className="mt-2 font-body text-[11px] leading-5 text-fadezone-text/65">
                      Total Cut: ₱{TOTAL_PRICE} • Downpayment (40%): ₱
                      {DOWNPAYMENT_AMOUNT} • Balance at Shop: ₱{BALANCE_AMOUNT}
                    </p>
                  </div>
                </div>

                {/* Receipt Upload */}
                <div className="flex flex-col justify-between space-y-5">
                  <div>
                    <label className="block font-body text-xs font-bold uppercase tracking-[0.2em] text-fadezone-text/85">
                      Upload GCash Screenshot *
                    </label>

                    <p className="mt-1 font-body text-xs leading-5 text-fadezone-text/60">
                      Attach a clear screenshot showing the ₱
                      {DOWNPAYMENT_AMOUNT} payment, date, and GCash reference
                      number.
                    </p>

                    {!receiptPreview ? (
                      <label
                        htmlFor="gcash-receipt-upload"
                        className="mt-3 flex min-h-48 cursor-pointer flex-col items-center justify-center border-2 border-dashed border-fadezone-accent/50 bg-fadezone-background/60 p-5 text-center transition-colors hover:border-fadezone-accent hover:bg-fadezone-background"
                      >
                        <span className="font-heading text-2xl text-fadezone-accent">
                          + UPLOAD RECEIPT
                        </span>

                        <span className="mt-1.5 font-body text-[11px] uppercase tracking-[0.18em] text-fadezone-text/70">
                          Tap to choose screenshot
                        </span>

                        <span className="mt-1 font-body text-[10px] uppercase tracking-[0.15em] text-fadezone-text/45">
                          JPG, PNG, or WEBP (Max 5MB)
                        </span>

                        <input
                          id="gcash-receipt-upload"
                          type="file"
                          accept="image/jpeg,image/png,image/webp"
                          onChange={handleFileChange}
                          className="sr-only"
                        />
                      </label>
                    ) : (
                      <div className="mt-3 border border-fadezone-accent/60 bg-fadezone-background p-3">
                        <div className="relative aspect-4/3 w-full overflow-hidden border border-fadezone-text/15 bg-black/40">
                          <img
                            src={receiptPreview}
                            alt="GCash Receipt Preview"
                            className="h-full w-full object-contain"
                          />
                        </div>

                        <div className="mt-2.5 flex items-center justify-between gap-2">
                          <span className="truncate font-body text-[11px] text-fadezone-text/75">
                            {receiptFile?.name}
                          </span>

                          <button
                            type="button"
                            onClick={handleRemoveReceipt}
                            className="shrink-0 border border-fadezone-text/25 px-2.5 py-1 font-body text-[10px] font-bold uppercase tracking-[0.18em] text-fadezone-accent transition-colors hover:border-fadezone-accent"
                          >
                            Replace
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* GCash Reference */}
                  <div>
                    <label
                      htmlFor="gcash-ref"
                      className="block font-body text-xs font-bold uppercase tracking-[0.2em] text-fadezone-text/80"
                    >
                      GCash Reference No. (Optional)
                    </label>

                    <input
                      id="gcash-ref"
                      type="text"
                      maxLength={100}
                      placeholder="e.g. 0012 345 678901"
                      value={gcashRef}
                      onChange={(e) => setGcashRef(e.target.value)}
                      className="mt-2 w-full border border-fadezone-text/25 bg-fadezone-background px-4 py-3 font-body text-sm text-fadezone-text placeholder:text-fadezone-text/35 focus:border-fadezone-accent focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {error && (
                <p
                  role="alert"
                  className="mt-6 border border-fadezone-accent bg-fadezone-background/80 px-4 py-3 font-body text-xs font-bold text-fadezone-accent"
                >
                  {error}
                </p>
              )}

              {/* Submit */}
              <div className="mt-8 flex flex-col items-start justify-between gap-5 border-t border-dashed border-fadezone-text/25 pt-6 sm:flex-row sm:items-center">
                <p className="max-w-sm font-body text-xs leading-5 text-fadezone-text/65">
                  Bookings are reviewed manually by our shop. Once approved,
                  your chair is locked in.
                </p>

                <button
                  type="submit"
                  className="group flex w-full items-center justify-center gap-3 border border-fadezone-accent bg-fadezone-accent px-8 py-4 font-body text-xs font-bold uppercase tracking-[0.22em] text-fadezone-text transition-colors hover:bg-fadezone-background hover:text-fadezone-accent sm:w-auto"
                >
                  <span>Submit Receipt for Approval</span>

                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </button>
              </div>
            </form>
          </div>
        )}
      </Container>
    </main>
  );
}
