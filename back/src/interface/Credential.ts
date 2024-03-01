export interface ICredential {
  id_credential: number;
  password_hash: string;
}

export type TdataLogin = {
  username: string;
  password: string;
};
