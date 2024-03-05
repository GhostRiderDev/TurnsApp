import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { SECRET } from "../config/envs";
import ValidationErrror from "../Error/ValidationError";
import { UserDAO } from "../repository/repositories";
import ResourceNotFoundError from "../Error/ResourceNotFoundError";
import { validateUUID } from "../service/validations";
import TurnDTO from "../DTO/TurnDTO";
import InvalidOperatioError from "../Error/InvalidOperationError";

export const verifyToken = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const token = getTokenFrom(req);
  if (!token) {
    throw new ValidationErrror("Token not can be empty");
  }

  const decodedToken: JwtPayload | string = jwt.verify(token, SECRET as string);

  if (typeof decodedToken === "string") {
    throw new ValidationErrror("Invalid token");
  }
  if (!decodedToken.id) {
    throw new ValidationErrror("Invalid token");
  }
  return next();
};

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = getTokenFrom(req);
  if (!token) {
    throw new ValidationErrror("Token not can be empty");
  }

  const decodedToken: JwtPayload | string = jwt.verify(token, SECRET as string);

  if (typeof decodedToken === "string") {
    throw new ValidationErrror("Invalid token");
  }
  const user = await UserDAO.findOneBy({ id_user: decodedToken.id });

  if (!user) {
    throw new ResourceNotFoundError("User not found");
  }

  if (user.role !== "Admin") {
    return res.status(401).json({ error: "Unauthorized access" }).send();
  }

  return next();
};
const getTokenFrom = (req: Request) => {
  const authorization = req.get("authorization");

  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.slice(7);
  }
  return null;
};

export const isMine = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = getTokenFrom(req);
  if (!token) {
    throw new ValidationErrror("Token not can be empty");
  }

  const decodedToken: JwtPayload | string = jwt.verify(token, SECRET as string);

  if (typeof decodedToken === "string") {
    throw new ValidationErrror("Invalid token");
  }
  const user = await UserDAO.findOneBy({ id_user: decodedToken.id });

  if (!user) {
    throw new ResourceNotFoundError("User not found");
  }
  const id = req.params.id;

  if (!id) {
    throw new ValidationErrror("Id can not empy");
  }

  validateUUID(id);

  if (user.id_user !== id) {
    return res.status(401).json({ error: "Unauthorized action" }).send();
  }

  return next();
};

export const isMyTurn = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const token = getTokenFrom(req);
  if (!token) {
    throw new ValidationErrror("Token not can be empty");
  }
  const decodedToken: JwtPayload | string = jwt.verify(token, SECRET as string);

  if (typeof decodedToken === "string") {
    throw new ValidationErrror("Invalid token");
  }

  const turnToSave: TurnDTO = req.body.turn;

  if (decodedToken.id !== turnToSave.id_client) {
    throw new InvalidOperatioError(
      "Invalid operation you need must be a client"
    );
  }

  return next();
};
