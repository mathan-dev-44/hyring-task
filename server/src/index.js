import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cardRouter from "./router/cardRouter.js";
import { socketServer } from "./sockets/socket.js";
import { Server } from "socket.io";
import http from "http";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
const server = http.createServer(app);

socketServer(server);

app.use("/api/cards", cardRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
