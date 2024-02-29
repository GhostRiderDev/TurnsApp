import { Request, Response } from "express";
import { ITurn } from "../interface/Turn";
import {
  findTurns,
  findTurn,
  addTurn,
  refreshTurn,
  removeTurn,
} from "../service/TurnService";

export const getTurns = async (_: Request, res: Response): Promise<void> => {
  const turns = await findTurns();
  res
    .status(200)
    .json({
      turns: turns,
    })
    .send();
};

export const getTurn = async (req: Request, res: Response): Promise<void> => {
  const id: number = +req.params.id;
  const turn = await findTurn(id);
  res.status(200).json({ turn }).send();
};

export const createTurn = async (
  req: Request,
  res: Response
): Promise<void> => {
  const turnToSave: ITurn = req.body.turn;
  const turnSaved: ITurn = await addTurn(turnToSave);
  res.status(201).send(`saved turn ${turnSaved}`);
};

export const updateTurn = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id: number = +req.params.id;
  const turnToUpdate: ITurn = req.body.turn;
  const turnUpdated: ITurn = await refreshTurn(id, turnToUpdate);
  res.status(200).send(`updated turn ${turnUpdated} with id=${id}`);
};

export const cancelTurn = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id: number = +req.params.id;
  await removeTurn(id);
  res.status(204).send(`delete turn {} with id=${id}`);
};
