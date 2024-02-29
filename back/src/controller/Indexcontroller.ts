import { Request, Response } from "express";

export const getIndex = async (_: Request, res: Response): Promise<void> => {
  res.send("Welcome to API about turns of field of soccer");
};
