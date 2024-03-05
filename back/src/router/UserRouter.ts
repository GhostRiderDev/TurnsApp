import express from "express";
import {
  getUsers,
  getUser,
  registerUser,
  updateUser,
  deleteUser,
  login,
} from "../controller/UserController";
import { verifyToken, isAdmin, isMine } from "../middleware/token";

const UsersRouter = express.Router();

UsersRouter.get("/", isAdmin, getUsers);
UsersRouter.get("/:id", verifyToken, isMine, getUser);
UsersRouter.post("/register", registerUser);
UsersRouter.post("/login", login);
UsersRouter.put("/:id", verifyToken, isMine, updateUser);
UsersRouter.delete("/:id", verifyToken, isMine, deleteUser);

export default UsersRouter;
