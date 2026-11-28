const readline = require("readline");
const bcrypt = require("bcryptjs");
const db = require("../config/db");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askPassword(question) {
  return new Promise((resolve) => {
    process.stdout.write(question);

    let password = "";

    if (process.stdin.isTTY) {
      process.stdin.setRawMode(true);
    }

    process.stdin.resume();

    const onData = (key) => {
      const char = key.toString();

      if (char === "\r" || char === "\n") {
        process.stdin.removeListener("data", onData);
        process.stdin.setRawMode(false);
        process.stdout.write("\n");
        resolve(password);
      } else if (char === "\u0003") {
        process.exit();
      } else if (char === "\u007f") {
        password = password.slice(0, -1);
      } else {
        password += char;
      }
    };

    process.stdin.on("data", onData);
  });
}

async function createAdmin() {
  try {
    const password = await askPassword("Enter new admin password: ");
    const confirmation = await askPassword("Confirm admin password: ");

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
      `INSERT INTO admin_credentials (singleton_key, password_hash)
       VALUES (1, ?)`,
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