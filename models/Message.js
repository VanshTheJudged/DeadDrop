const mongoose = require("mongoose");
const messageScheme = new mongoose.Schema({
   uuid: { type: String, required: true }, // <-- needed
   encryptedData: String,
   iv: String,
   keyHint: String,//optional hint for the key
   expiresAt:{type: Date,index: {expires: 0}}//TTL auto delete after 0 seconds 
});

module.exports = mongoose.model("Message", messageScheme);
//This exports the Message model based on the messageScheme schema.
//