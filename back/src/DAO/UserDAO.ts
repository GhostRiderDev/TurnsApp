import { IClient } from "../interface/Client";
import { IUser, Role } from "../interface/User";

const users: IUser[] = [
  {
    id_user: 1,
    username: "olvadis2004@gmail.com",
    first_name: "olvadis",
    last_name: "Hernandez",
    contact: {
      phone: "3023246222",
    },
    birthdate: 24566,
    nDni: "12345665",
    role: Role.CLIENT,
    profile_image: "https://cos4h.png",
    id_credential: 400,
  },
  {
    id_user: 2,
    username: "antonio@gmail.com",
    first_name: "Antonio",
    last_name: "Lopez",
    contact: {
      phone: "3234564532",
    },
    nDni: "4564434",
    role: Role.ADMIN,
    profile_image: "https://kraken.png",
    id_credential: 100,
  },
] as IClient[];

export default users;
