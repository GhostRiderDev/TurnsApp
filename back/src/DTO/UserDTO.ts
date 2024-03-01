import { Role } from "../interface/User";

interface UserDTO {
  id_user?: number;
  username: string;
  first_name: string;
  last_name: string;
  contact?: {
    phone?: string;
  };
  profile_image?: string;
  role: Role;
  id_credential?: number;
}

export default UserDTO;
