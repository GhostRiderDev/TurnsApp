import { IUser } from "./User";

export interface IClient extends IUser {
  contact: TClientContact;
  profile_image: string;
  birthdate: number;
}

type TClientContact = {
  phone: string;
};
