import { prisma } from "../db/prisma.js";

export const getCards = async (req, res) => {
  const cards = await prisma.card.findMany();
  res.json(cards);
};

export const createCard = async (req, res) => {
  const { ...cardData } = req.body;
  const card = await prisma.card.create({
    data: {
      ...cardData,
      position: 0,
    },
  });
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

  res.json(card);
};
export const deleteCard = async (req, res) => {
  const { id } = req.params;

  await prisma.card.delete({
    where: {
      id,
    },
  });

  res.json({
    success: true,
  });
};
