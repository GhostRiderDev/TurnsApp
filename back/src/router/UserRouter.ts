import express from "express";
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  login,
} from "../controller/UserController";

const UsersRouter = express.Router();

UsersRouter.get("/", getUsers);
UsersRouter.get("/:id", getUser);
UsersRouter.post("/register", createUser);
UsersRouter.post("/login", login);
UsersRouter.put("/:id", updateUser);
UsersRouter.delete("/:id", deleteUser);

export default UsersRouter;
