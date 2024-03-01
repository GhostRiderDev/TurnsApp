import credentials from "../DAO/CredentialDAO";
import { ICredential } from "../interface/Credential";
import { generateId } from "../utils/generate";

export const validateCredential = async (
  id: number,
  key: string
): Promise<boolean> => {
  const credential = credentials.find((c) => c.id_credential === id);
  return credential?.password_hash === key;
};

export const addCredential = async (key: string): Promise<number> => {
  const id: number = await generateId(credentials as [], "id_credential");
  const credential: ICredential = {
    id_credential: id,
    password_hash: key,
  };
  credentials.push(credential);
  return id;
};
