import { Role } from "../interface/User";

interface UserDTO {
  id_user?: string;
  username: string;
  first_name: string;
  last_name: string;
  phone?: string;
  profile_image?: string;
  role: Role;
  id_credential?: string;
  birthdate: number;
  nDni?: string;
}

export default UserDTO;
