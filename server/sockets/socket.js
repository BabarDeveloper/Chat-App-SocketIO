const Message = require("../models/Message");

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("send_message", async (data) => {
      console.log("Incoming Message:", data);

      try {
        const newMsg = await Message.create({
          text: data.text,
          sender: data.sender,
        });

        io.emit("recieve_message", newMsg);
      } catch (error) {
        console.log(error);
      }
    });
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};
