import express from "express";
import authRouter from "./routes/auth.router";

import { Server, Socket } from "socket.io";
import { WebsocketService } from "./services/websocket.service";
var bodyParser = require("body-parser");
const app = express();
var cors = require("cors");
const port = "3000";

app.use(cors());
app.use(bodyParser.json());
app.use("/api/auth", authRouter);

const server = app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

const io = new Server(server);
const wsHandler = new WebsocketService(io);
io.on("connection", wsHandler.websocketConnectHandler);
io.on("disconnect", wsHandler.websocketDisconnectHandler);

wsHandler.init();
