/* eslint-disable indent*/
//!! Estupido Eslint te he ganado!!!

import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import FieldEntity from "./FieldEntity";
import { EState } from "../interface/Turn";
import UserEntity from "./UserEntity";

@Entity({ name: "Turn" })
class TurnEntity {
  @PrimaryGeneratedColumn("uuid")
  id_turn!: string;
  @Column({ type: "date" })
  date!: Date;
  @Column({
    type: "enum",
    nullable: false,
    default: EState.ACTIVE,
    enum: EState,
  })
  state!: EState;
  @Column({ type: "int", nullable: false })
  start_time!: number;
  @Column({ type: "int", nullable: false })
  finish_time!: number;

  @ManyToMany(() => FieldEntity, { lazy: false })
  @JoinTable()
  id_fields!: FieldEntity[];

  @Column({ type: "uuid", nullable: false })
  id_client!: string;

  @ManyToOne(() => UserEntity, (user) => user.turns)
  @JoinColumn({ name: "id_client" })
  client!: UserEntity;

  @Column({ type: "uuid", nullable: false })
  id_admin!: string;

  @ManyToOne(() => UserEntity, (user) => user.turns)
  @JoinColumn({ name: "id_admin" })
  admin!: UserEntity;
}

export default TurnEntity;
