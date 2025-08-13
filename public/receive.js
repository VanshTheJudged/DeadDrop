async function fetchMessage() {
  const passphrase = document.getElementById("passphrase").value;
  const output = document.getElementById("output");

  if (!passphrase) {
    output.innerText = "Please enter your passpharse.";
    return;
  }

  try {
    const res = await fetch(`/message/${passphrase}`);
    const data = await res.json();

    if (res.ok && data.messages && data.messages.length > 0) {
      output.innerText = data.messages
        .map((msg, i) => `Message ${i + 1}:\n${msg.decryptedMessage}`)
        .join("\n\n");
    } else {
      output.innerText = data.error || "No message found.";
    }
  } catch (err) {
    console.error(err);
    output.innerText = "Failed to connect to server.";
  }
}
