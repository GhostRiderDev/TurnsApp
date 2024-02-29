import express from "express";
import {
  getTurns,
  getTurn,
  createTurn,
  updateTurn,
  cancelTurn,
} from "../controller/TurnController";

const turnsRouter = express.Router();

turnsRouter.get("/", getTurns);
turnsRouter.get("/:id", getTurn);
turnsRouter.post("/schedule", createTurn);
turnsRouter.put("/", updateTurn);
turnsRouter.delete("/:id", cancelTurn);

export default turnsRouter;
