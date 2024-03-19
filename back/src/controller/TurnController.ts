import { NextFunction, Request, Response } from "express";
import { ITurn } from "../interface/Turn";
import {
  findTurns,
  findTurn,
  addTurn,
  updateTurn,
  findTurnsClient,
} from "../service/TurnService";
import { UUID } from "crypto";
import TurnDTO from "../DTO/TurnDTO";
import { validateTurn } from "../service/validations";
import ValidationErrror from "../Error/ValidationError";
import { findUser } from "../service/UserService";
import ResourceNotFoundError from "../Error/ResourceNotFoundError";
import InvalidOperatioError from "../Error/InvalidOperationError";
import { decodeToken, getTokenFrom } from "../middleware/token";
import { JwtPayload } from "jsonwebtoken";
import { getFieldById, saveField } from "../service/FieldService";
import FieldEntity from "../entity/FieldEntity";

export const getTurns = async (_: Request, res: Response): Promise<void> => {
  const turns = await findTurns();
  res
    .status(200)
    .json({
      turns: turns,
    })
    .send();
};

export const getTurnsClient = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id_user } = req.params;
    if (!id_user) {
      throw new ValidationErrror("id_user not can be empty");
    }
    const turnsClient = await findTurnsClient(id_user as UUID);
    if (!turnsClient.length) {
      res.status(200).json({ turns: turnsClient }).send();
    }

    const token = getTokenFrom(req);
    if (!token) {
      throw new ValidationErrror("token not can be empty");
    }
    const decodedToken: JwtPayload | string = decodeToken(token);
    if (typeof decodedToken === "string") {
      throw new ValidationErrror("Invalid token");
    }
    if (turnsClient[0].id_client !== decodedToken.id_user) {
      throw new InvalidOperatioError("Unauthorized");
    }
    if (turnsClient[0].id_client === decodedToken.id_user) {
      res.status(200).json({ turns: turnsClient });
    }
  } catch (error) {
    next(error);
  }
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

    //! This must be solve is garbage
    getFieldById(turnToSave.id_fields[0]).catch(() => {
      const fieldToSave: FieldEntity = {
        id_field: turnToSave.id_fields[0] as UUID,
        dimentions: 20,
        image_field: "https://w7.pngwin-transparent-luis-diaz.png",
        description: "Cool field",
      };
      saveField(fieldToSave);
    });

    validateTurn(turnToSave);
    const clienDB = findUser(turnToSave.id_client as UUID);
    if (!clienDB) {
      throw new ResourceNotFoundError(
        `Client not found with id: ${turnToSave.id_client}`
      );
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
