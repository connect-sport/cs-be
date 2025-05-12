module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    socket.on("join_room", (room) => {
      socket.join(room);
      socket.to(room).emit("user_joined", `${socket.id} joined ${room}`);
    });

    socket.on("send_message", ({ room, message }) => {
      io.to(room).emit("receive_message", { message, sender: socket.id });
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
};
