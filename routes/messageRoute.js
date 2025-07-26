const express = require("express");
const router = express.Router();
const { encrypt } = require("../controllers/encryptor");
const Message = require("../models/Message");
const crypto = require("crypto");
const {v4: uuidv4} = require("uuid");
const { decrypt } = require("../controllers/decryptor");
/*
📦 require("uuid")
This is importing a Node.js library called uuid.
UUID stands for Universally Unique Identifier.
It’s used to generate random, unique IDs — like a3f4b2c1-2b19-49b4-a4d5-e7f1e6c3d1b2.
🧩 { v4: uuidv4 }This is destructuring. It means:
"From the uuid library, take the function named v4, and rename it as uuidv4 in my code."
*/

router.post("/send", async (req, res) =>{
    const {text} = req.body;
    if(!text) return res.status(400).json({error: "Text is required"});

    const key = crypto.randomBytes(32).toString("hex");
    //The key is randomly generated using crypto.randomBytes(32).
    //32 bytes = 256 bits = aes-256 encryption. 
    //toString("hex") converts it to a hexadecimal string.

    const {encryptedData, iv} = encrypt(text, key);
    //encrypt function takes the text and key, returns encryptedData and iv.

    const newMessage = new Message({
        uuid: uuidv4(),// Generates a unique identifier for the message.
        encryptedData,
        iv,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), //expires in 24 hours
    })

    await newMessage.save();
    //Saves the new message to the MongoDB database.

    res.json({
        Message: "Encrypted And Stored Successfully",
        id: newMessage.uuid,
        key,
    });
});

// ✅ GET /api/read/:id — decrypt + delete
router.get("/read/:id", async (req, res) => {
  const id = req.params.id;
  const key = req.query.key;

  if (!key) return res.status(400).json({ error: "Decryption key is required in query param" });

  const doc = await Message.findOne({ uuid: id });

  if (!doc) {
    return res.status(404).json({ message: "Secret not found or already viewed." });
  }

  try {
    const decrypted = decrypt(doc, key);//Previously i was simply giving the whole doc object which contents iv, encryptedData, etc.
    //But it only needs encryptedData and iv for decryption.

    // 🔥 Self-destruct (one-time read)
    await Message.deleteOne({ uuid: id });

    return res.json({ message: decrypted });
  } catch (error) {
    console.error("Decryption failed:", error);
    return res.status(400).json({ error: "Failed to decrypt. Invalid key or data." });
  }
});

module.exports = router;