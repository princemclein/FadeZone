const express = require("express");
const router = express.Router();
const db = require("../config/db");
const uploadReceipt = require("../middleware/uploadReceipt");

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Booking API is running!",
  });
});


router.post("/", uploadReceipt, async (req, res) => {
  console.log("Receipt uploaded:", req.file.receiptPath);

  res.status(200).json({
    success: true,
    message: "Receipt uploaded and validated successfully.",
    receiptPath: req.file.receiptPath,
  });
});


module.exports = router;
