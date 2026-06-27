import { prisma } from "../db/prisma.js";
import { getSocket } from "../sockets/socket.js";

export const getCards = async (req, res) => {
  const cards = await prisma.card.findMany();
  res.json(cards);
};

export const createCard = async (req, res) => {
  const { socketId, ...cardData } = req.body;
  const card = await prisma.card.create({
    data: {
      ...cardData,
      position: 0,
    },
  });
  getSocket().emit("card:created", card);
  res.json(card);
};

export const updateCard = async (req, res) => {
  const card = await prisma.card.update({
    where: {
      id: req.params.id,
    },
    data: {
      title: req.body.title,
      status: req.body.status,
      position: req.body.position,
    },
  });
  getSocket().emit("card:updated", card);
  res.json(card);
};
export const deleteCard = async (req, res) => {
  const { id, socketId } = req.params;

  await prisma.card.delete({
    where: {
      id,
    },
  });

  getSocket().except(socketId).emit("card:deleted", {
    id: req.params.id,
  });

  res.json({
    success: true,
  });
};
