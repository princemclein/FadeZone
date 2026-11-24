const express = require("express");
require("dotenv").config();
const db = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({ success: true, message: "FadeZone API is running!" });
});

// Start server
app.listen(PORT, () => {
  console.log(`FadeZone server running on port ${PORT}`);
});
