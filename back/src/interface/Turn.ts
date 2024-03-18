import FieldEntity from "../entity/FieldEntity";

export interface ITurn {
  id_turn: string;
  id_client: string;
  id_admin: string;
  date: string;
  state: EState;
  start_time: number;
  finish_time: number;
  id_fields: FieldEntity[];
}

export enum EState {
  ACTIVE = "Active",
  CANCELED = "Canceled",
}
