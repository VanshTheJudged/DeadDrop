const BASE_URL = "http://localhost:5000"; // or your backend URL

function sendMessage() {
  const passphrase = document.getElementById("passphrase").value;
  const message = document.getElementById("message").value;

  fetch(`${BASE_URL}/send`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ passphrase, message })
  })
    .then(res => res.json())
    .then(data => {
      document.getElementById("status").innerText = "Message sent!";
    })
    .catch(err => {
      document.getElementById("status").innerText = "Error sending message.";
    });
}

function viewMessages() {
  const passphrase = document.getElementById("viewPassphrase").value;

  fetch(`${BASE_URL}/messages/${passphrase}`)
    .then(res => res.json())
    .then(data => {
      const messagesDiv = document.getElementById("messages");
      messagesDiv.innerHTML = "";
      data.messages.forEach(msg => {
        const p = document.createElement("p");
        p.innerText = msg;
        messagesDiv.appendChild(p);
      });
    })
    .catch(err => {
      document.getElementById("messages").innerText = "Error fetching messages.";
    });
}
