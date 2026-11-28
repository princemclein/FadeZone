const express = require("express");
require("dotenv").config();

const cors = require("cors");
const cookieParser = require("cookie-parser");

const db = require("./config/db");
const barberRoutes = require("./routes/barberRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// API Routes
app.use("/api/admin", adminRoutes);
app.use("/api/barbers", barberRoutes);
app.use("/api/bookings", bookingRoutes);

// Health Check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "FadeZone API is running!",
  });
});

// Database Health Check
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

// Start Server
app.listen(PORT, () => {
  console.log(`FadeZone server running on port ${PORT}`);
});