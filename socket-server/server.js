const express = require("express");

const { createServer } = require("http");
const { Server } = require("socket.io");
const { join } = require("path");
const app = express();

const server = createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

app.use(express.static(join(__dirname, "public")));
//Serve the assests
app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

//listen to connection from client
io.on("connection", (socket) => {
  //   console.log(socket);
  console.log("A user connected");
  //Emit a message to the client

  socket.emit("messageFromServer", "hello from the server");

  //listen  for a message from the client
  socket.on("messageFromClient", (message) => {
    console.log("Recieved from the client ", message);
    //braod cast the mesasge to all connected clients except the sender
    socket.broadcast.emit("messageFromServer", message);
  });
});
//Start the server

server.listen(PORT, console.log(`Server is running on ${PORT}`));
