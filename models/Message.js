const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  passphrase: { type: String, required: true },   // acts like a room
  encryptedMessage: { type: String, required: true },
  key: { type: String, required: true },
  iv: { type: String, required: true },
  visitCount: { type: Number, default: 0 },        // how many times this message was viewed
  maxVisits: { type: Number, default: 3 },         // how many times it can be viewed before deletion
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Message", MessageSchema);
