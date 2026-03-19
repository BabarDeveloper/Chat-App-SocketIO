require("dotenv").config();
const http = require("http");
const { Server } = require("socket.io");

const app = require("./app");
const connectDB = require("./config/db");

connectDB();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const { instrument } = require("@socket.io/admin-ui");
instrument(io, {
  auth: false,
  mode: "development",
});

require("./sockets/socket")(io);

const PORT = 8000;

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
  console.log(`Socket.IO Admin UI: http://localhost:${PORT}/admin`);
});
