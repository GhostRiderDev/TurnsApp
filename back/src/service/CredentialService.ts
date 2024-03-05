import { UUID } from "crypto";
import CredentialEntity from "../entity/CredentialEntity";
import { CredentialDAO } from "../repository/repositories";
import bcrypt from "bcryptjs";

export const validateCredential = async (
  id: UUID,
  key: string
): Promise<boolean> => {
  const credential = await CredentialDAO.findOneBy({
    id_credential: id,
  });

  if (!credential) {
    return false;
  }

  return bcrypt.compare(key, credential?.password_hash);
};

export const addCredential = async (key: string): Promise<string> => {
  const credentialFromEntity = new CredentialEntity();
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(key, saltRounds);
  credentialFromEntity.password_hash = passwordHash;
  const credentialSaved: CredentialEntity = await CredentialDAO.save(
    credentialFromEntity
  );
  return credentialSaved.id_credential;
};
