import express from "express";
import indexRouter from "./router/IndexRouter";
import turnsRouter from "./router/TurnRouter";
import usersRouter from "./router/UserRouter";
import { isAuthorized } from "./middleware/auth";
import morgan from "morgan";
import cors from "cors";

const server = express();

server.use(express.json());
server.use(morgan("dev"));
server.use(cors());

server.use("/", indexRouter);
server.use("/turns", turnsRouter);
server.use("/users", isAuthorized, usersRouter);

export default server;
