const messageRoutes = require("./routes/message.routes");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/messages", messageRoutes);

app.get("/", (req, res) => {
  res.send("API Running...");
});

module.exports = app;
