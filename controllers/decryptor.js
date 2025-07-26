const crypto = require("crypto");//inbuilt module for cryptography
const algorithm = "aes-256-cbc";

function decrypt(doc, key){
    if (!doc || !doc.iv || !doc.encryptedData) {
        console.error("Missing doc, iv, or encryptedData:", doc);
        throw new Error("Missing data required for decryption");
    }

    const decipher = crypto.createDecipheriv(
        algorithm,
        Buffer.from(key, "hex"),
        Buffer.from(doc.iv, "hex")  // ✅ Correct: using IV from database
    );

    let decrypted = decipher.update(doc.encryptedData, "hex", "utf8");
    decrypted += decipher.final("utf8");

    return decrypted;
}

module.exports = { decrypt };