import express, { Request, Response } from "express";
import { Server } from "socket.io";
import { isRegisteredWsMiddleware } from "./middlewares/is-registered-middleware";
import authRouter from "./routes/auth.router";
import { WebsocketService } from "./services/websocket.service";
import { DefaultError } from "./types/exceptions/default-error.exception";
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

app.use((err: any, req: Request, res: Response, next: any) => {
  if (err instanceof DefaultError) {
    const { getMessageObject, getStatusCode } = err;
    res.status(getStatusCode()).send(getMessageObject());
  } else {
    const defaultError = new DefaultError();
    res
      .status(defaultError.getStatusCode())
      .send(defaultError.getMessageObject());
  }
  next();
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
wsHandler.init();
