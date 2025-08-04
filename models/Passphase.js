const mongoose = require("mongoose");

const passphaseSchema = new mongoose.Schema({
  passphrase: { type: String, required: true},
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Passphase", passphaseSchema);
