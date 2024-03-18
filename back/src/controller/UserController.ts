import { NextFunction, Request, Response } from "express";
import {
  addUser,
  findUser,
  findUsers,
  generateToken,
  isValidCredentials,
  refreshUser,
  removeUser,
} from "../service/UserService";
import UserDTO from "../DTO/UserDTO";
import CredentialDTO from "../DTO/CredentialDTO";
import { addCredential } from "../service/CredentialService";
import { UUID } from "crypto";
import {
  validateClient,
  validateClientToUpdate,
  validateUUID,
  validateUser,
} from "../service/validations";
import ResourceNotFoundError from "../Error/ResourceNotFoundError";
import { AppDataSource } from "../data-source";
import ValidationErrror from "../Error/ValidationError";
import { UserDAO } from "../repository/repositories";
import InvalidOperatioError from "../Error/InvalidOperationError";

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
  res: Response<{ user: UserDTO }>,
  next: NextFunction
): Promise<void> => {
  try {
    const id = req.params.id;
    validateUUID(id);
    const userDB = await findUser(id as UUID);
    if (!userDB) {
      throw new ResourceNotFoundError("User not found Exception");
    }
    res.status(200).json({ user: userDB }).send();
  } catch (error) {
    next(error);
  }
};

export const registerUser = async (
  req: Request<{ user: UserDTO; credential: CredentialDTO }>,
  res: Response<UserDTO>,
  next: NextFunction
): Promise<void> => {
  try {
    const userReceived: UserDTO = req.body.user;
    const userToSave = {
      ...userReceived,
      birthdate: new Date(userReceived.birthdate),
    };

    validateUser(userToSave);
    if (userReceived.role === "Client") {
      const { birthdate, profile_image, phone, nDni } = userToSave;
      validateClient({ birthdate, profile_image, phone, nDni });
    }
    const userExist = (
      await UserDAO.existsBy({ username: userReceived.username })
    ).valueOf();

    if (userExist) {
      throw new InvalidOperatioError(
        `User with user with username ${userReceived.username} is already registered`
      );
    }
    const credentialToSave: CredentialDTO = req.body.credential;

    // if not saved credential not save user
    const userSaved = await AppDataSource.manager.transaction(
      "REPEATABLE READ",
      async () => {
        const id_credential = await addCredential(credentialToSave.password);
        userReceived.id_credential = id_credential;
        const userSaved: UserDTO = await addUser(userReceived);
        return userSaved;
      }
    );
    res.status(201).send(userSaved);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response<UserDTO>,
  next: NextFunction
): Promise<void> => {
  try {
    const id = req.params.id;
    const userToUpdate: UserDTO = req.body.user;
    if (!userToUpdate) {
      throw new ValidationErrror("User to update not can be empty");
    }
    if (userToUpdate.role === "Client") {
      validateClientToUpdate(userToUpdate);
    } else {
      validateUser(userToUpdate);
    }
    const userUpdated = await refreshUser(id, userToUpdate);
    res.status(200).send(userUpdated);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request<{ id: string }>,
  res: Response<string>,
  next: NextFunction
): Promise<void> => {
  try {
    const id: string = req.params.id;

    removeUser(id as UUID);
    res.status(204).send(`delete User {} with id=${id}`);
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request<{ username: string; password: string }>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { username, password } = req.body;
    const isValid = await isValidCredentials(username, password);
    const data = await generateToken(username);
    if (isValid) {
      res
        .status(200)
        .json({ ...data })
        .send();
    } else {
      res.status(204).json({ result: "UnAuthorized" }).send();
    }
  } catch (error) {
    next(error);
  }
};
