/* eslint-disable indent */
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "Credential" })
class CredentialEntity {
  @PrimaryGeneratedColumn("uuid")
  id_credential!: string;
  @Column({ nullable: false, length: 100, type: "varchar" })
  password_hash!: string;
}

export default CredentialEntity;
