import { Request, Response } from "express";
import {
  addUser,
  findUser,
  findUsers,
  isValidCredentials,
  refreshUser,
  removeUser,
} from "../service/UserService";
import UserDTO from "../DTO/UserDTO";

export const getUsers = async (
  _: Request,
  res: Response<{ users: UserDTO[] }>
): Promise<void> => {
  const users = await findUsers();
  res
    .status(200)
    .json({
      users: users,
    })
    .send();
};

export const getUser = async (
  req: Request<{ id: string }>,
  res: Response<{ user: UserDTO }>
): Promise<void> => {
  const id: number = +req.params.id;
  const userDB: UserDTO = await findUser(id);
  res.status(200).json({ user: userDB }).send();
};

export const createUser = async (
  req: Request<UserDTO>,
  res: Response<UserDTO>
): Promise<void> => {
  const userToSave: UserDTO = req.body.User;
  const userSaved: UserDTO = await addUser(userToSave);
  res.status(201).send(userSaved);
};

export const updateUser = async (
  req: Request<{ id: string }>,
  res: Response<UserDTO>
): Promise<void> => {
  const id: number = Number.parseInt(req.params.id);
  const userToUpdate: UserDTO = req.body.User;
  const userUpdated = await refreshUser(id, userToUpdate);
  res.status(200).send(userUpdated);
};

export const deleteUser = async (
  req: Request<{ id: string }>,
  res: Response<string>
): Promise<void> => {
  const id: number = Number.parseInt(req.params.id);
  removeUser(id);
  res.status(204).send(`delete User {} with id=${id}`);
};

export const login = async (
  req: Request<{ username: string; password: string }>,
  res: Response<{ result: string }>
): Promise<void> => {
  const { username, password } = req.body;
  const isValid = await isValidCredentials(username, password);
  if (isValid) {
    res.status(200).json({ result: "Authorized" });
  } else {
    res.status(204).json({ result: "UnAuthorized" });
  }
};
