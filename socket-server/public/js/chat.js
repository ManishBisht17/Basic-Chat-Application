//instance of socket

const socket = io();

//select element

const sendButton = document.querySelector(".send-button");
const messageArea = document.querySelector("#messageArea");
const messageInput = document.querySelector("#messageInput");

//add message
function addMessage(message, sender) {
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${sender}-message`;
  messageDiv.textContent = message;
  messageArea.appendChild(messageDiv);
  messageArea.scrollTop = messageArea.scrollHeight;
}

//display server message

socket.on("messageFromServer", (message) => {
  addMessage(message, "server");
});

//send message to the server

function sendMessage() {
  const message = messageInput.value.trim();
  if (message) {
    socket.emit("messageFromClient", message);
    addMessage(message, "client");
    messageInput.value = "";
  }
}
sendButton.addEventListener("click", sendMessage);
