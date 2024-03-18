import axios from "axios";

const BASE_URL = "http://localhost:8888/turns/client";

export const getTurnsClient = async (id_client: string, token: string) => {
  const response = await axios.get(`${BASE_URL}/${id_client}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
