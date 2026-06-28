import { Server } from "socket.io";

let io;

const onlineUsers = new Map();

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    const userId = socket.handshake.auth?.userId || socket.id;

    if (!onlineUsers.has(userId)) {
      onlineUsers.set(userId, new Set());
    }
    onlineUsers.get(userId).add(socket.id);

    io.emit("users:online", Array.from(onlineUsers.keys()));
    console.log("connected:", socket.id);

    socket.on("disconnect", () => {
      console.log("Disconnected:", socket.id);

      const sockets = onlineUsers.get(userId);

      if (sockets) {
        sockets.delete(socket.id);

        if (sockets.size === 0) {
          onlineUsers.delete(userId);
        }
      }

      io.emit("users:online", Array.from(onlineUsers.keys()));
    });
  });

  return io;
};

export const getIO = () => io;
