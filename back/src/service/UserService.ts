import UserDTO from "../DTO/UserDTO";
import { IClient } from "../interface/Client";
import { IUser } from "../interface/User";
import users from "../DAO/UserDAO";
import logger from "../utils/logger";
import { TdataLogin } from "../interface/Credential";
import { validateCredential } from "./CredentialService";
import { generateId } from "../utils/generate";
import UserNotFoundError from "../Error/UserError";

export const findUsers = async (): Promise<UserDTO[]> => {
  const usersDTO: UserDTO[] = await users.map((user) =>
    convertUserToDTO(user as IClient)
  );
  return usersDTO;
};

export const findUser = async (id: number): Promise<UserDTO> => {
  const client: IUser | undefined = await users.find(
    (user) => user.id_user === id
  );
  if (!client) {
    throw new UserNotFoundError("User not found");
  }
  client.id_user = id;
  const userDB_DTO: UserDTO = await convertUserToDTO(client as IClient);
  return userDB_DTO;
};

export const addUser = async (userToAdd: UserDTO): Promise<UserDTO> => {
  const user = userToAdd;
  const id_user = await generateId(users as [], "id_user");
  user.id_user = id_user;
  users.push(user as IClient);
  const userSavedDTO = convertUserToDTO(user as IClient);
  return userSavedDTO;
};

export const refreshUser = async (
  id: number,
  userToUpdate: UserDTO
): Promise<UserDTO> => {
  userToUpdate.id_user = id;
  const client: IUser = users[0];
  const clientDTO: UserDTO = convertUserToDTO(client as IClient);
  return clientDTO;
};

export const removeUser = async (id: number): Promise<void> => {
  logger.info(`removed User with username=${id}`);
};

export const isValidCredentials = async (
  username: string,
  password: string
): Promise<boolean> => {
  const userFound = users.find((user) => user.username === username);
  logger.err("hola");
  if (!userFound) {
    throw new UserNotFoundError("User not found");
  }
  const isValidCredential = await validateCredential(
    userFound.id_credential,
    password
  );
  if (userFound && isValidCredential) {
    return true;
  }
  return false;
};

export const convertUserToDTO = ({
  username,
  first_name,
  last_name,
  role,
  contact,
  profile_image,
}: IClient) => {
  const userDTO = {
    username,
    first_name,
    last_name,
    role,
    contact,
    profile_image,
  };
  return userDTO;
};

export const validLogin = async (
  dataLogin: TdataLogin
): Promise<number | void> => {
  const userFound: IUser | undefined = users.find(
    (user) => user.username === dataLogin.username
  );
  if (!userFound) {
    throw new UserNotFoundError("User not found");
  }

  if (await validateCredential(userFound.id_credential, dataLogin.password)) {
    return userFound.id_credential;
  }
};
