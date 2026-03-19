const io = require("socket.io-client");
const readline = require("readline");

console.log("Connecting to chat server...");
const socket = io("http://localhost:8000");

socket.on("connect", () => {
  console.log("✅ Connected to chat server!");

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("Enter your name: ", (name) => {
    console.log(
      `\nWelcome ${name}! Type your messages below (type "exit" to quit):\n`,
    );

    rl.on("line", (message) => {
      if (message.toLowerCase() === "exit") {
        console.log("Disconnecting...");
        socket.disconnect();
        rl.close();
      } else if (message.trim()) {
        socket.emit("send_message", { sender: name, text: message });
        console.log(`You: ${message}`);
      }
    });
  });
});

socket.on("receive_message", (data) => {
  if (data.sender) {
    console.log(`\n${data.sender}: ${data.text}`);
  }
});

socket.on("load_messages", (messages) => {
  console.log("\n=== Previous Messages ===");
  messages.forEach((msg) => {
    console.log(`${msg.sender}: ${msg.text}`);
  });
  console.log("=========================\n");
});

socket.on("disconnect", () => {
  console.log("\nDisconnected from chat server");
});

socket.on("connect_error", (error) => {
  console.log("❌ Connection failed");
  console.error(error);
  process.exit(1);
});
