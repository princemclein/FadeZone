const readline = require("readline");
const bcrypt = require("bcryptjs");
const db = require("../config/db");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const ask = (question) =>
  new Promise((resolve) => rl.question(question, resolve));

async function createAdmin() {
  try {
    const password = await ask("Enter your new admin password: ");
    const confirmation = await ask("Confirm your password: ");

    if (password.length < 12) {
      throw new Error("Password must be at least 12 characters.");
    }

    if (password !== confirmation) {
      throw new Error("Passwords do not match.");
    }

    const [existing] = await db.query(
      "SELECT id FROM admin_credentials WHERE singleton_key = 1"
    );

    if (existing.length > 0) {
      throw new Error("Admin credentials already exist.");
    }

    const passwordHash = await bcrypt.hash(password, 12);

    await db.query(
      "INSERT INTO admin_credentials (singleton_key, password_hash) VALUES (1, ?)",
      [passwordHash]
    );

    console.log("Admin credentials created successfully.");
  } catch (error) {
    console.error("Setup failed:", error.message);
  } finally {
    rl.close();
    await db.end();
  }
}

createAdmin();