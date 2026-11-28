
const multer = require("multer");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const uploadDirectory = path.join(
  __dirname,
  "..",
  "uploads",
  "receipts"
);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 1,
  },
});

const uploadReceipt = async (req, res, next) => {
  try {
    await new Promise((resolve, reject) => {
      upload.single("receipt")(req, res, (error) => {
        if (error) reject(error);
        else resolve();
      });
    });

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "A GCash receipt image is required.",
      });
    }

    const { fileTypeFromBuffer } = await import("file-type");
    const fileType = await fileTypeFromBuffer(req.file.buffer);

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!fileType || !allowedTypes.includes(fileType.mime)) {
      return res.status(400).json({
        success: false,
        message: "Only valid JPEG, PNG, and WebP images are allowed.",
      });
    }

    await fs.promises.mkdir(uploadDirectory, { recursive: true });

    const filename = `${crypto.randomUUID()}.${fileType.ext}`;
    const filePath = path.join(uploadDirectory, filename);

    await fs.promises.writeFile(filePath, req.file.buffer, {
      flag: "wx",
    });

    req.file.filename = filename;
    req.file.path = filePath;
    req.file.receiptPath = `uploads/receipts/${filename}`;

    next();
  } catch (error) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        message: "Receipt image must not exceed 5 MB.",
      });
    }

    console.error("Receipt upload error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to process receipt image.",
    });
  }
};

module.exports = uploadReceipt;
