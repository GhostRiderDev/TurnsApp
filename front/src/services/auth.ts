import { IuserToRegister } from "@/interfaces/IUser";
import axios from "axios";

export const BASE_URL = "http://localhost:8888/users";

export const login = async (credentials: {
  username: string;
  password: string;
}) => {
  const result = await axios.post(`${BASE_URL}/login`, credentials);
  return result.data;
};

export const register = async (user: IuserToRegister) => {
  const result = await axios.post(`${BASE_URL}/register`, user);
  return result;
};
