import { Request, Response, NextFunction } from "express";

export const isAuthorized = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.headers;
  if (token === "autenticado") next();
  else res.status(401).json({ message: "unauthorized" }).send();
};
