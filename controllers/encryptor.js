// controllers/encryptor.js
const crypto = require("crypto");//inbuilt module for cryptography
const algorithm = "aes-256-cbc";
/*
This sets the encryption algorithm.
"aes-256-cbc" stands for:
    AES: Advanced Encryption Standard.
    256: Key size (256 bits = 32 bytes).
    CBC: Cipher Block Chaining mode.
It's a secure and commonly used symmetric encryption method.
*/


function encrypt(text, key) {

  const iv = crypto.randomBytes(16);
    /*
    iv stands for Initialization Vector.
    It's a random 16-byte value generated using crypto.randomBytes(16).
    
    Purpose of IV: Even if you encrypt the same text multiple times, a 
    different IV ensures different ciphertexts each time, preventing
    patterns.
    */

  const cipher = crypto.createCipheriv(algorithm, Buffer.from(key, "hex"), iv);

  /*
  This is the encryption function.
  Takes in:
    text: the plain text string to encrypt.
    key: a hex string representing the 32-byte key (since we're using aes-256).
    Buffer.from(key, "hex") converts the key from hex string to a binary Buffer (which crypto needs).
    createCipheriv() creates a Cipher object using:
    algorithm (aes-256-cbc)
    key (as a buffer)
    iv (initialization vector)
  */

  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  /*
  cipher.update():
    Takes the input text in "utf8" format.
    Encrypts it and outputs in "hex" format.
    cipher.final("hex"):
    Completes the encryption process.
    Some encryption algorithms buffer part of the data and only finalize at the end.
  */

  return { encryptedData: encrypted, iv: iv.toString("hex") };
  /*
  Returns an object with:
    encryptedData: the final encrypted string in hex.
    iv: the random IV (converted to hex) so it can be used later for decryption.
    The decryption side will require this same IV.
  */
}

module.exports = { encrypt };
