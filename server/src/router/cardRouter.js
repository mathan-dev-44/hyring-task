import express from "express";
import {
  createCard,
  deleteCard,
  getCards,
  updateCard,
} from "../controller/cardController.js";

const cardRouter = express.Router();

cardRouter.get("/", getCards);

cardRouter.post("/", createCard);

cardRouter.put("/:id", updateCard);

cardRouter.delete("/:id", deleteCard);

export default cardRouter;
