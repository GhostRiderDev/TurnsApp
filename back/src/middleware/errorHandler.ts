import { NextFunction, Request, Response } from "express";
import logger from "../utils/logger";

const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.name === "ValidationError") {
    res
      .status(400)
      .json({
        message: err.message,
      })
      .send();
    logger.err(err.name, err.message, err.stack as string);
  } else if (err.name === "ResourceNotFoundError") {
    res
      .status(404)
      .json({
        message: err.message,
      })
      .send();
    logger.err(err.name, err.message, err.stack as string);
  } else if (err.name === "JsonWebTokenError") {
    res.status(401).json({ error: "Invalid token" });
  } else if (err.name === "TokenExpiredError") {
    res.status(401).json({
      error: "token expired",
    });
  } else if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: "Unauthorized access" });
  } else if (err.name === "SyntaxError") {
    res.status(401).json({ error: "Invalid token" });
  } else if (err.name === "InvalidOperatioError") {
    res.status(401).json({ error: err.message });
  } else {
    res.status(500).json({ error: err.message });
    next(err);
  }
};

export default errorHandler;
