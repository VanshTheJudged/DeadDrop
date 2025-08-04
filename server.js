// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require("cors");


const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

// ✅ Serve all frontend HTML/CSS/JS from "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Define routes to serve specific HTML files (if needed)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'landing.html'));
});

app.get('/index', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/receive', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'receive.html'));
});

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
