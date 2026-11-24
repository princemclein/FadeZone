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

module.exports = router;
