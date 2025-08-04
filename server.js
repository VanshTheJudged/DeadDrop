// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require("cors");


const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

// ✅ Mount all message-related routes under /api
const messageRoutes = require("./routes/message");
app.use("/message", messageRoutes);


// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(err => {
    console.error("MongoDB connection error:", err);
  });

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
