import ITurn from "@/interfaces/ITurn";
import axios from "axios";

const BASE_URL = "http://localhost:8888/turns";

export const getTurnsClient = async (id_client: string, token: string) => {
  const response = await axios.get(`${BASE_URL}/client/${id_client}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const createTurnClient = async (turnToPost: ITurn, token: string) => {
  const response = await axios.post(
    `${BASE_URL}/schedule`,
    { turn: turnToPost },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log(response);
};
