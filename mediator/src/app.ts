import express from "express";
import authRouter from "./routes/auth.router";

import { Server } from "socket.io";
import { isRegisteredWsMiddleware } from "./middlewares/is-registered-middleware";
import { WebsocketService } from "./services/websocket.service";
var bodyParser = require("body-parser");
const app = express();
var cors = require("cors");
const port = "3000";

app.use(cors());
app.use(bodyParser.json());
app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  res.send("HELLO");
});

const server = app.listen(port, () => {
  console.log(`Server is running at port: ${port}`);
});

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
const wsHandler = new WebsocketService(io);

io.use(isRegisteredWsMiddleware);

io.on("connection", wsHandler.websocketConnectHandler);
io.on("disconnect", wsHandler.websocketDisconnectHandler);

wsHandler.init();
