const express = require("express");

const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();

const server = createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

//Start the server

server.listen(PORT, console.log(`Server is running on ${PORT}`));
