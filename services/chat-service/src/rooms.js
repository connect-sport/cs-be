const Message = require("./models/Message");

module.exports = function (io, socket) {
  socket.on("message", async (data) => {
    console.log("Message received:", data);

    // Phát lại tin nhắn cho tất cả client trừ người gửi
    socket.broadcast.emit("message", data);
    try {
      const saved = await Message.create({
        text: data.text,
        sender: data?.sender,
      });
      console.log("Saved message:", saved);

      // Gửi lại cho các client khác
      socket.broadcast.emit("message", saved);
    } catch (err) {
      console.error("Failed to save message:", err);
    }
  });

  // Lắng nghe typing
  socket.on("typing", (data) => {
    // data = { isTyping: true/false, userId: ... }

    // Phát sự kiện typing cho các client khác
    socket.broadcast.emit("typing", data);
  });

  socket.on("get-messages", async () => {
    const messages = await Message.find().sort({ createdAt: 1 }).limit(100);
    socket.emit("messages", messages);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
};
