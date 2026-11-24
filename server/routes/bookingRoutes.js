const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Booking API is running!",
  });
});

router.post("/", async (req, res) => {
  const {
    customer_name,
    customer_mobile,
    haircut_style,
    booking_date,
    booking_time,
  } = req.body;

  if (
    !customer_name ||
    !customer_mobile ||
    !haircut_style ||
    !booking_date ||
    !booking_time
  ) {
    return res.status(400).json({
      success: false,
      message: "Please provide all required booking details.",
    });
  }

  res.status(200).json({
    success: true,
    message: "Booking details validated successfully.",
  });
});

module.exports = router;
