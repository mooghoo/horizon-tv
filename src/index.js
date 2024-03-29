import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server);

let color = "#005640";

io.on("connection", (socket) => {

  socket.on("emoji", (emoji) => {
    socket.broadcast.emit("emoji", emoji);
  });

  socket.on("cookie", (cookie) => {
    socket.broadcast.emit("cookie", cookie);
  });

  socket.on("color", (selectedColor) => {
    color = selectedColor;
    socket.broadcast.emit("color", selectedColor);
  });

  socket.on("message", (message) => {
    io.emit("messageForReview", message);
  });

  socket.on("acceptMessage", (message) => {
    io.emit("message", message);
  });

  socket.on("refresh", () => {
    io.emit("refresh");
  });
});

app.use('/fonts', express.static('fonts'))
app.use('/public', express.static('public'))

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: "./views" });
});

app.get("/display", (req, res) => {
  res.sendFile("display.html", { root: "./views" });
});

app.get("/admin", (req, res) => {
  res.sendFile("admin.html", { root: "./views" });
});


server.listen(3000, () => {
  console.log("listening on *:3000");
});
