const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const rateLimit = require("express-rate-limit");
const db = require("../config/db");
const requireAdmin = require("../middleware/requireAdmin");

const router = express.Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  skipSuccessfulRequests: true,
  message: {
    success: false,
    message: "Too many login attempts. Please try again later.",
  },
});

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/api",
  maxAge: 60 * 60 * 1000,
};

// POST /api/admin/login
router.post("/login", loginLimiter, async (req, res) => {
  try {
    const { username, password } = req.body;

    if (
      typeof username !== "string" ||
      typeof password !== "string" ||
      !username.trim() ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required.",
      });
    }

    if (username.trim() !== process.env.ADMIN_USERNAME) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password.",
      });
    }

    const [rows] = await db.query(
      "SELECT password_hash FROM admin_credentials WHERE singleton_key = 1 LIMIT 1"
    );

    if (!rows.length) {
      return res.status(401).json({
        success: false,
        message: "Admin credentials have not been configured.",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      rows[0].password_hash
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password.",
      });
    }

    const token = jwt.sign(
      { role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("fadezone_admin_token", token, cookieOptions);

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      user: { username: process.env.ADMIN_USERNAME },
    });
  } catch (error) {
    console.error("Admin login error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to process login.",
    });
  }
});

// GET /api/admin/me
router.get("/me", requireAdmin, (req, res) => {
  res.status(200).json({
    success: true,
    user: { username: process.env.ADMIN_USERNAME },
  });
});

// POST /api/admin/logout
router.post("/logout", (req, res) => {
  res.clearCookie("fadezone_admin_token", cookieOptions);

  res.status(200).json({
    success: true,
    message: "Logged out successfully.",
  });
});

module.exports = router;