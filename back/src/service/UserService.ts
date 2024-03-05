import UserDTO from "../DTO/UserDTO";
import { IUser } from "../interface/User";
import { TdataLogin } from "../interface/Credential";
import { validateCredential } from "./CredentialService";
import { AppDataSource } from "../data-source";
import UserEntity from "../entity/UserEntity";
import { UUID } from "crypto";
import ResourceNotFoundError from "../Error/ResourceNotFoundError";
import { dateToNumber, numberToDate } from "../utils/DateConverter";
import { UserDAO } from "../repository/repositories";
import jwt from "jsonwebtoken";
import { SECRET } from "../config/envs";

export const findUsers = async (): Promise<UserDTO[]> => {
  const usersDB: UserEntity[] = await UserDAO.find();
  const usersDTO: UserDTO[] = await Promise.all(
    usersDB.map((userDB: UserEntity) => {
      const userDTO: UserDTO = {
        ...userDB,
        birthdate: new Date(userDB.birthdate).getTime(),
      };
      return userDTO;
    })
  );
  return usersDTO;
};

export const findUser = async (id: UUID): Promise<UserDTO> => {
  const userFound: UserEntity | null = await UserDAO.findOneBy({
    id_user: id,
  });

  if (!userFound) {
    throw new ResourceNotFoundError("User not found");
  } else {
    const userDTO: UserDTO = {
      ...userFound,
      birthdate: new Date(userFound.birthdate).getTime(),
    };

    return userDTO;
  }
};

export const addUser = async ({
  username,
  id_credential,
  last_name,
  first_name,
  profile_image,
  role,
  phone,
  birthdate,
  nDni,
}: UserDTO): Promise<UserDTO> => {
  const userFromEntity = new UserEntity();

  userFromEntity.username = username;
  userFromEntity.id_credential = id_credential as string;
  userFromEntity.last_name = last_name;
  userFromEntity.first_name = first_name;
  userFromEntity.profile_image = profile_image as string;
  userFromEntity.role = role;
  userFromEntity.phone = phone as string;
  userFromEntity.birthdate = numberToDate(birthdate);
  userFromEntity.nDni = nDni as string;

  const userDB: UserEntity = await UserDAO.save(userFromEntity);

  const userDTO_DB: IUser = {
    ...userDB,
    birthdate: dateToNumber(userDB.birthdate),
  };

  const userSavedDTO = convertUserToDTO(userDTO_DB);

  return userSavedDTO;
};

export const refreshUser = async (
  id: string,
  userToUpdate: UserDTO
): Promise<UserDTO> => {
  const userDB = await UserDAO.findOneBy({ id_user: id });
  if (!userDB) {
    throw new ResourceNotFoundError(`Not found User with id: ${id}`);
  }
  userToUpdate.id_user = id;
  const date = new Date();
  date.setTime(userToUpdate.birthdate);

  await UserDAO.update(
    {
      id_user: id,
    },
    { ...userToUpdate, birthdate: date }
  );

  const userUpdated = await findUser(id as UUID);

  const userDTO: UserDTO = convertUserToDTO(userUpdated as IUser);
  return userDTO;
};

export const removeUser = async (id: UUID): Promise<void> => {
  const userDB = await UserDAO.findOneBy({ id_user: id });
  if (!userDB) {
    throw new ResourceNotFoundError(`User not found with id: ${id}`);
  }
  await UserDAO.delete({ id_user: id });
};

export const isValidCredentials = async (
  username: string,
  password: string
): Promise<boolean> => {
  const userFound = await UserDAO.findOneBy({
    username: username,
  });
  if (!userFound) {
    throw new ResourceNotFoundError("User not found");
  }
  const isValidCredential = await validateCredential(
    userFound.id_credential as UUID,
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
  phone,
  profile_image,
  id_user,
  birthdate,
  nDni,
}: IUser): UserDTO => {
  const userDTO: UserDTO = {
    username,
    first_name,
    last_name,
    role,
    phone,
    profile_image,
    id_user,
    birthdate,
    nDni,
  };
  return userDTO;
};

export const validLogin = async (
  dataLogin: TdataLogin
): Promise<string | void> => {
  const userFound = await AppDataSource.manager.findOneBy(UserEntity, {
    username: dataLogin.username,
  });
  if (!userFound) {
    throw new ResourceNotFoundError("User not found");
  }

  if (
    await validateCredential(
      userFound.id_credential as UUID,
      dataLogin.password
    )
  ) {
    return userFound.id_credential;
  }
};

export const generateToken = async (username: string): Promise<string> => {
  const user = await UserDAO.findOneBy({ username });

  if (!user) {
    throw new ResourceNotFoundError("User not found");
  }
  const userForToken = {
    username: user.username,
    id: user.id_user,
  };
  const token = jwt.sign(userForToken, SECRET as string, {
    expiresIn: 60 * 60 * 2,
  });
  return token;
};
