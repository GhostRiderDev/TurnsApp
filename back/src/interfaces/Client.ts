import { IUser } from "./User";

export interface IClient extends IUser {
  contact: TClientContact;
  profile_image: string;
}

type TClientContact = {
  phone: string;
};
