function sendMessage() {
  const passphrase = document.getElementById("passphrase").value;
  const content = document.getElementById("content").value;

fetch("http://localhost:5000/message", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    passphrase: passphrase,
    message: content
  })
})
    .then((res) => {
      if (!res.ok) throw new Error("Failed to send");
      return res.json();
    })
    .then((data) => {
      document.getElementById("status").innerText = "Message sent!";
      console.log(data);
    })
    .catch((err) => {
      document.getElementById("status").innerText = "Error sending message.";
      console.error("Error:", err);
    });
}
