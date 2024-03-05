export interface IUser {
  id_user: string;
  username: string;
  first_name: string;
  last_name: string;
  role: Role;
  id_credential: string;
  nDni: string;
  phone: string;
  profile_image: string;
  birthdate: number;
}

export enum Role {
  ADMIN = "Admin",
  CLIENT = "Client",
  OWNER = "Owner",
}
