const { Server } = require("socket.io");
const { verifyToken } = require("./utils/jwt");
const registerRoomHandlers = require("./rooms");

module.exports = function (server) {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;
    const user = verifyToken(token);
    console.log(user);
    // if (user) {
    socket.user = "me";
    next();
    // } else {
    //   next(new Error("Unauthorized"));
    // }
  });

  io.on("connection", (socket) => {
    console.log("✅ User connected:", socket.user.username);
    registerRoomHandlers(io, socket);
  });
};
