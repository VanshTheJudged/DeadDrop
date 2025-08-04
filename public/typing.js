const text = "DeadDrop";
let i = 0;

function type() {
  if (i < text.length) {
    document.getElementById("typewriter").innerHTML += text.charAt(i);
    i++;
    setTimeout(type, 150);
  }
}

window.onload = type;
