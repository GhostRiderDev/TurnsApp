/* eslint-disable indent */
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Role } from "../interface/User";
import CredentialEntity from "./CredentialEntity";
import TurnEntity from "./TurnEntity";

@Entity({ name: "User" })
class UserEntity {
  @PrimaryGeneratedColumn("uuid")
  id_user!: string;
  @Column({ type: "varchar", length: 50, nullable: false, unique: true })
  username!: string;
  @Column({ type: "varchar", length: 50, nullable: false })
  first_name!: string;
  @Column({ type: "varchar", length: 50, nullable: false })
  last_name!: string;
  @Column({ type: "enum", nullable: false, enum: Role })
  role!: Role;

  @Column({ type: "varchar", nullable: true })
  nDni!: string;
  @Column({ type: "varchar", nullable: true })
  phone!: string;
  @Column({ type: "varchar", nullable: true })
  profile_image!: string;
  @Column({ type: "date", nullable: true })
  birthdate!: Date;

  @Column({ type: "uuid", nullable: false })
  id_credential!: string;

  @OneToOne(() => CredentialEntity, { cascade: true, onDelete: "CASCADE" })
  @JoinColumn({ name: "id_credential" })
  credential!: CredentialEntity;

  @OneToMany(() => TurnEntity, (turn) => turn.client, {
    cascade: true,
    onDelete: "CASCADE",
  })
  turns!: TurnEntity[];
}

export default UserEntity;
