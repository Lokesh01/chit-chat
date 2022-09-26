const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const colors = require("colors");
const connectDB = require("./config/db");
const socket = require("socket.io");
const path = require("path");

//importing routes
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes");

dotenv.config();
connectDB();
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoutes);

// -----------Deployment----------------

// const __dirname1 = path.resolve();
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname1, "/client/build")));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname1, "client", "build", "index.html"));
//   });
// } else {
//   app.get("/", (req, res) => {
//     res.send("API is running successfully");
//   });
// }

//-----------Deployment-----------------

const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
  console.log(`server started on port ${PORT}...`.yellow.bold);
});

//socket.io config

const io = socket(server, {
  cors: {
    origin: "https://chit-chat-mern-app.netlify.app",
    credentials: true,
  },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log("Connected to socket.io");

  global.chatSocket = socket;
  //store online users in the map
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.receiver);
    //checking if the user receiving msg is online
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-receive", data.msg);
    }
  });
});
