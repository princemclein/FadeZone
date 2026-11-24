const express = require("express");
const db = require("../config/db");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const [barbers] = await db.query(
      "SELECT * FROM barbers WHERE is_active = TRUE",
    );

    res.status(200).json({
      success: true,
      data: barbers,
    });
  } catch (error) {
    console.error("Failed to fetch barbers:", error);

    res.status(500).json({
      success: false,
      message: "Failed to retrieve barbers.",
    });
  }
});

router.post("/", async (req, res) => {
  // 1. Extract request data
  const { full_name, chair_code, chair_label, display_name } = req.body;

  // 2. Validate required fields
  const requiredFields = [full_name, chair_code, chair_label, display_name];

  if (
    requiredFields.some((field) => typeof field !== "string" || !field.trim())
  ) {
    return res.status(400).json({
      success: false,
      message: "All barber fields are required.",
    });
  }

  try {
    const [result] = await db.query(
      `INSERT INTO barbers
      (full_name, chair_code, chair_label, display_name)
     VALUES (?, ?, ?, ?)`,
      [
        full_name.trim(),
        chair_code.trim(),
        chair_label.trim(),
        display_name.trim(),
      ],
    );

    res.status(201).json({
      success: true,
      message: "Barber added successfully.",
      barberId: result.insertId,
    });
  } catch (error) {
    console.error("Failed to add barber:", error);

    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        success: false,
        message: "This chair code is already assigned.",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to add barber.",
    });
  }
});

module.exports = router;
