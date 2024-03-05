import express from "express";
import {
  getTurns,
  getTurn,
  createTurn,
  cancelTurn,
} from "../controller/TurnController";
import { isAdmin, verifyToken } from "../middleware/token";

const turnsRouter = express.Router();

turnsRouter.get("/", isAdmin, getTurns);
turnsRouter.get("/:id", verifyToken, getTurn);
turnsRouter.post("/schedule", verifyToken, createTurn);
turnsRouter.delete("/:id", verifyToken, cancelTurn);

export default turnsRouter;
