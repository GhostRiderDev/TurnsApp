import UserDTO from "../DTO/UserDTO";
import { IClient } from "../interface/Client";
import { Role } from "../interface/User";
import logger from "../utils/logger";

const users: IClient[] = [
  {
    id_user: 1,
    username: "olvadis2004@gmail",
    first_name: "olvadis",
    last_name: "Hernandez",
    contact: {
      phone: "3023246222",
    },
    role: Role.ADMIN,
    profile_image: "https://cos4h.png",
    id_credential: 400,
  },
];

export const findUsers = async (): Promise<UserDTO[]> => {
  const usersDTO: UserDTO[] = await users.map((user) => convertUserToDTO(user));
  return usersDTO;
};

export const findUser = async (id: number): Promise<UserDTO> => {
  const client: IClient = users[0];
  client.id_user = id;
  const userDB_DTO: UserDTO = await convertUserToDTO(client);
  return userDB_DTO;
};

export const addUser = async (userToAdd: UserDTO): Promise<UserDTO> => {
  const user = userToAdd;
  const client: IClient = users[0];
  logger.info(`on addUser service ${user}`);
  const userSavedDTO = convertUserToDTO(client);
  return userSavedDTO;
};

export const refreshUser = async (
  id: number,
  userToUpdate: UserDTO
): Promise<UserDTO> => {
  userToUpdate.id_user = id;
  const client: IClient = users[0];
  const clientDTO: UserDTO = convertUserToDTO(client);
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
  if (userFound && password === "root") {
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
