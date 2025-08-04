const crypto = require("crypto");

// AES-256-CBC requires a 32-byte key and 16-byte IV
const algorithm = "aes-256-cbc";

function encryptText(text) {
  const key = crypto.randomBytes(32); // 256-bit key
  const iv = crypto.randomBytes(16);  // 128-bit IV

  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");

  return {
    encryptedData: encrypted,
    key: key.toString("hex"),
    iv: iv.toString("hex"),
  };
}

function decryptText(encryptedData, keyHex, ivHex) {
  const key = Buffer.from(keyHex, "hex");
  const iv = Buffer.from(ivHex, "hex");

  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encryptedData, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}

module.exports = {
  encryptText,
  decryptText,
};
