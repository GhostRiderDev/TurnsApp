import "reflect-metadata";

import { DataSource } from "typeorm";
import UserEntity from "./entity/UserEntity";
import CredentialEntity from "./entity/CredentialEntity";
import TurnEntity from "./entity/TurnEntity";
import FieldEntity from "./entity/FieldEntity";
import UserEvent from "./event/UserEvent";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from "./config/envs";

const host = DB_HOST || "localhost";
const port = DB_PORT ? parseInt(DB_PORT) : 5432;
const username = DB_USER || "";
const password = DB_PASSWORD || "";
const database = DB_NAME || "";

export const AppDataSource = new DataSource({
  type: "postgres",
  host,
  port,
  username,
  password,
  database,
  synchronize: true,
  logging: false,
  entities: [UserEntity, CredentialEntity, TurnEntity, FieldEntity],
  migrations: [],
  subscribers: [UserEvent],
});
