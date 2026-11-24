const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const db = require("./config/db");
const barberRoutes = require("./routes/barberRoutes");

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/barbers", barberRoutes);

app.get("/api/health", (req, res) => {
  res.status(200).json({ success: true, message: "FadeZone API is running!" });
});

app.get("/api/health/db", async (req, res) => {
  try {
    await db.query("SELECT 1");

    res.status(200).json({
      success: true,
      message: "MySQL database connected successfully!",
    });
  } catch (error) {
    console.error("Database connection failed:", error);

    res.status(500).json({
      success: false,
      message: "Database connection failed.",
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`FadeZone server running on port ${PORT}`);
});
