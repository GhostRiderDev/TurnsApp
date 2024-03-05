import { AppDataSource } from "../data-source";
import CredentialEntity from "../entity/CredentialEntity";
import FieldEntity from "../entity/FieldEntity";
import TurnEntity from "../entity/TurnEntity";
import UserEntity from "../entity/UserEntity";

export const UserDAO = AppDataSource.getRepository(UserEntity);
export const CredentialDAO = AppDataSource.getRepository(CredentialEntity);
export const TurnDAO = AppDataSource.getRepository(TurnEntity);
export const FieldDAO = AppDataSource.getRepository(FieldEntity);
