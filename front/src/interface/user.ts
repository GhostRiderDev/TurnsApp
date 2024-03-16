export interface IUser {
  id_user: string;
  username: string;
  first_name: string;
  last_name: string;
  role: Role;
  nDni: string;
  phone: string;
  profile_image: string;
  birthdate: string;
}

export enum Role {
  ADMIN = "Admin",
  CLIENT = "Client",
  OWNER = "Owner",
}
