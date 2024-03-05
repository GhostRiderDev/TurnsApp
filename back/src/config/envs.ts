import dotenv from "dotenv";
dotenv.config();

export const PORT: string | undefined = process.env.PORT;
export const DB_HOST = process.env.HOST;
export const DB_PORT = process.env.DB_PORT;
export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_NAME = process.env.DB_NAME;
export const EMAIL_USER = process.env.EMAIL_USER;
export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
export const SECRET = process.env.SECRET;
