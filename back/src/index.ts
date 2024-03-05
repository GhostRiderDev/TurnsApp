import server from "./server";
import { PORT } from "./config/envs";
import { AppDataSource } from "./data-source";

server.listen(PORT, () => {
  console.log(`Server running on port http://127.0.0.1:${PORT}`);
  try {
    connectToDB();
  } catch (error) {
    setTimeout(() => connectToDB(), 10000);
  }
});

const connectToDB = async () => {
  await AppDataSource.initialize();
};
