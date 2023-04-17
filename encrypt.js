const crypto = require("crypto");

// Function to encrypt data using AES-256-CBC
function encrypt(text, key, iv) {
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}

// Function to decrypt data using AES-256-CBC
function decrypt(encryptedText, key, iv) {
  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
  let decrypted = decipher.update(encryptedText, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

// Example usage
const secretKey = crypto.randomBytes(32); // A 256-bit (32-byte) random key
const iv = crypto.randomBytes(16); // A 128-bit (16-byte) random initialization vector

const text = "This is a secret message!";
const encryptedText = encrypt(text, secretKey, iv);
const decryptedText = decrypt(encryptedText, secretKey, iv);

console.log("Original text:", text);
console.log("Encrypted text:", encryptedText);
console.log("Decrypted text:", decryptedText);
