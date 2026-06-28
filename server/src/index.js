import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cardRouter from "./router/cardRouter.js";
import { initSocket } from "./sockets/socket.js";
import { Server } from "socket.io";
import http from "http";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/cards", cardRouter);

const server = http.createServer(app);

initSocket(server);

server.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT}`);
});
