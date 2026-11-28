const jwt = require("jsonwebtoken");

const requireAdmin = (req, res, next) => {
  const token = req.cookies?.fadezone_admin_token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Authentication required.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.admin = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired session.",
    });
  }
};

module.exports = requireAdmin;