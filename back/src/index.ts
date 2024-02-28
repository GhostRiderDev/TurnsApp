import { IClient } from "./interfaces/Client";
import { Role } from "./interfaces/User";

const userIndex: IClient = {
  username: "olvadis2004@gmail",
  first_name: "olvadis",
  last_name: "Hernandez",
  contact: {
    phone: "3023246222",
  },
  role: Role.ADMIN,
  profile_image: "https://cos4h.png",
  id_credential: 400,
};

console.log(userIndex);
