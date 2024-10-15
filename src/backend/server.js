const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("New connection:", socket.id);

  // For messages
  socket.on("sendMessage", (message) => {
    console.log("Message received:", message);
    socket.broadcast.emit("receiveMessage", message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

app.get("/", (req, res) => {
  res.send("Socket.IO Server is running");
});

const PORT = process.env.PORT || 8099;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
