//Server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const messageRoute = require("./routes/messageRoute"); // ✅ this line

const app = express();
app.use(express.json());
dotenv.config();


// ✅ Mount route
app.use("/api", messageRoute); // ← mounts all /send, /read under /api

//connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log("Connected to MongoDB");
}).catch(err => {console.error("MongoDB connection error:", err)});

//Routes
app.get('/api', require("./routes/messageRoute"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});