const Message = require("../models/Message");

module.exports = (io) => {
  io.on("connection", async (socket) => {
    console.log("User connected:", socket.id);

    try {
      const existingMessages = await Message.find().sort({ createdAt: 1 });
      socket.emit("load_messages", existingMessages);
    } catch (error) {
      console.log("Error loading messages:", error);
    }

    socket.on("send_message", async (data) => {
      console.log("Incoming Message:", data);

      try {
        const newMsg = await Message.create({
          text: data.text,
          sender: data.sender,
        });

        io.emit("receive_message", newMsg);
      } catch (error) {
        console.log(error);
      }
    });
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};
