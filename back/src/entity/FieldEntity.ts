/* eslint-disable indent */
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "Field" })
class FieldEntity {
  @PrimaryGeneratedColumn("uuid")
  id_field!: string;
  @Column({ type: "varchar", nullable: false, length: 200 })
  image_field!: string;
  @Column({ type: "int", nullable: false })
  dimentions!: number;
  @Column({ type: "varchar", nullable: true, length: 100 })
  description!: string;
}

export default FieldEntity;
