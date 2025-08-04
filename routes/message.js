const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const Message = require("../models/Message");

// AES encryption function
function encrypt(text) {
  const iv = crypto.randomBytes(16);
  const key = crypto.randomBytes(32);
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return {
    encryptedData: encrypted,
    key: key.toString("hex"),
    iv: iv.toString("hex")
  };
}

// @route POST /message
// @desc Create a new encrypted message
router.post("/", async (req, res) => {
  try {
    const { message, passphrase, maxVisits } = req.body;

    if (!message || !passphrase) {
      return res.status(400).json({ error: "Message and passphrase are required." });
    }

    const { encryptedData, key, iv } = encrypt(message);

    const newMessage = new Message({
      passphrase,
      encryptedMessage: encryptedData,
      key,
      iv,
      maxVisits: maxVisits || 1
    });

    await newMessage.save();
    return res.status(201).json({ success: true, msg: "Message saved!" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error." });
  }
});

// AES decryption function
function decrypt(encryptedData, keyHex, ivHex) {
  const key = Buffer.from(keyHex, "hex");
  const iv = Buffer.from(ivHex, "hex");

  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
  let decrypted = decipher.update(encryptedData, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

// @route GET /message/:passphrase
// @desc Get all messages for a passphrase, decrypt them, increment visitCount
router.get("/:passphrase", async (req, res) => {
  try {
    const { passphrase } = req.params;

    const messages = await Message.find({ passphrase });

    if (messages.length === 0) {
      return res.status(404).json({ error: "No messages found." });
    }

    const decryptedMessages = [];

    for (const msg of messages) {
      // If maxVisits reached, delete the message
      if (msg.visitCount >= msg.maxVisits) {
        await Message.findByIdAndDelete(msg._id);
        continue;
      }

      // Decrypt the message
      const decrypted = decrypt(msg.encryptedMessage, msg.key, msg.iv);
      decryptedMessages.push({
        id: msg._id,
        decryptedMessage: decrypted,
        visitCount: msg.visitCount + 1,
        maxVisits: msg.maxVisits
      });

      // Increment visit count
      msg.visitCount += 1;
      await msg.save();
    }

    if (decryptedMessages.length === 0) {
      return res.status(410).json({ error: "Messages expired." });
    }

    return res.status(200).json({ success: true, messages: decryptedMessages });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error." });
  }
});


module.exports = router;
