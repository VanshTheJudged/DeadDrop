# DeadDrop

Day 1 – Project Setup & Backend Initialization
✅ What We Did
Today, we began building DeadDrop — a simple anonymous messaging platform where users can post and read messages. We focused entirely on setting up the backend using basic but powerful tools.

🧰 Tech Stack Used (Day 1)
Technology	Description
Node.js	A JavaScript runtime that lets us run server-side code. Think of it as the engine behind our backend.
Express.js	A lightweight web framework that helps us handle HTTP requests (like when users send or receive messages).
MongoDB Atlas	A cloud-based NoSQL database where we store all anonymous messages.
Mongoose	A library that connects our Node.js app with MongoDB in a cleaner way.
dotenv	Allows us to store sensitive data like DB URLs in a .env file instead of writing them directly in the code.

⚙️ Features Implemented
✅ Created a backend server using Express.

✅ Connected our backend to a MongoDB database hosted on MongoDB Atlas.

✅ Defined a schema for anonymous messages using Mongoose.

✅ Set up routes:

POST /message – to receive and save messages.

GET /messages – to fetch all saved messages.

✅ Verified everything works with Postman (tested adding and fetching messages).

✅ All data is stored in MongoDB under:

Database: DeadDrop

Collection: Message

📂 Folder Structure (Day 1)

DeadDrop/
│
├── server.js         # Entry point of the backend
├── models/
│   └── Message.js    # Mongoose schema for storing messages
├── .env              # Hidden file for sensitive environment variables
├── package.json      # Project config with dependencies
🧪 How to Test
Run the server:

node server.js
Test APIs with Postman:

POST to http://localhost:5000/message with JSON like { "content": "Hello world!" }

GET from http://localhost:5000/messages to fetch all messages
