const express = require("express");
const db = require("../config/db");
const requireAdmin = require("../middleware/requireAdmin");

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

router.get("/all", requireAdmin, async (req, res) => {
  try {
    const [barbers] = await db.query("SELECT * FROM barbers ORDER BY id ASC");

    res.status(200).json({
      success: true,
      data: barbers,
    });
  } catch (error) {
    console.error("Failed to fetch all barbers:", error);

    res.status(500).json({
      success: false,
      message: "Failed to retrieve barbers.",
    });
  }
});

router.post("/", requireAdmin, async (req, res) => {
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

router.delete("/:id", requireAdmin, async (req, res) => {
  const { id } = req.params;

  // Validate barber ID
  if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
    return res.status(400).json({
      success: false,
      message: "Invalid barber ID.",
    });
  }

  try {
    const [result] = await db.query(
      "UPDATE barbers SET is_active = FALSE WHERE id = ? AND is_active = TRUE",
      [id],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Barber not found or already inactive.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Barber deactivated successfully.",
    });
  } catch (error) {
    console.error("Failed to deactivate barber:", error);

    res.status(500).json({
      success: false,
      message: "Failed to deactivate barber.",
    });
  }
});

router.patch("/:id/activate", requireAdmin, async (req, res) => {
  const { id } = req.params;

  // Validate barber ID
  if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
    return res.status(400).json({
      success: false,
      message: "Invalid barber ID.",
    });
  }

  try {
    const [result] = await db.query(
      "UPDATE barbers SET is_active = TRUE WHERE id = ? AND is_active = FALSE",
      [id],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Barber not found or already active.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Barber reactivated successfully.",
    });
  } catch (error) {
    console.error("Failed to reactivate barber:", error);

    res.status(500).json({
      success: false,
      message: "Failed to reactivate barber.",
    });
  }
});

router.put("/:id", requireAdmin, async (req, res) => {
  const { id } = req.params;
  const { full_name, chair_code, chair_label, display_name } = req.body;

  // Validate barber ID
  if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
    return res.status(400).json({
      success: false,
      message: "Invalid barber ID.",
    });
  }

  // Validate required fields
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
      `UPDATE barbers
       SET full_name = ?, chair_code = ?, chair_label = ?, display_name = ?
       WHERE id = ?`,
      [
        full_name.trim(),
        chair_code.trim(),
        chair_label.trim(),
        display_name.trim(),
        id,
      ],
    );

    if (result.affectedRows === 0) {
      const [barbers] = await db.query("SELECT id FROM barbers WHERE id = ?", [
        id,
      ]);

      if (barbers.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Barber not found.",
        });
      }
    }

    res.status(200).json({
      success: true,
      message: "Barber updated successfully.",
    });
  } catch (error) {
    console.error("Failed to update barber:", error);

    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        success: false,
        message: "This chair code is already assigned.",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to update barber.",
    });
  }
});

module.exports = router;
