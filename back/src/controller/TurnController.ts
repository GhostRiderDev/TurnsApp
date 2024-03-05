import { NextFunction, Request, Response } from "express";
import { ITurn } from "../interface/Turn";
import {
  findTurns,
  findTurn,
  addTurn,
  updateTurn,
} from "../service/TurnService";
import { UUID } from "crypto";
import TurnDTO from "../DTO/TurnDTO";
import { validateTurn } from "../service/validations";
import ValidationErrror from "../Error/ValidationError";
import { findUser } from "../service/UserService";
import ResourceNotFoundError from "../Error/ResourceNotFoundError";

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
  const id: string = req.params.id;
  const turn = await findTurn(id as UUID);

  res.status(200).json({ turn }).send();
};

export const createTurn = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const turnToSave: TurnDTO = req.body.turn;
    if (!turnToSave) {
      throw new ValidationErrror("Turn not can be empty");
    }
    validateTurn(turnToSave);
    const clienDB = findUser(turnToSave.id_client as UUID);
    const adminDB = findUser(turnToSave.id_admin as UUID);
    if (!clienDB) {
      throw new ResourceNotFoundError(
        `Client not found with id: ${turnToSave.id_client}`
      );
    }
    if (!(adminDB && (await adminDB).role === "Admin")) {
      throw new ResourceNotFoundError("Invalid Admin");
    }
    const turnSaved: ITurn = await addTurn(turnToSave);
    res.status(201).send(turnSaved);
  } catch (error) {
    next(error);
  }
};

export const cancelTurn = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id: string = req.params.id;
  await updateTurn(id);
  res.status(204).send(`delete turn {} with id=${id}`);
};
