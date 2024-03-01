export interface ITurn {
  id_turn: number;
  id_client: number;
  id_admin: number;
  id_fields: TField[];
  date: number;
  state: EState;
  start_time: number;
  finish_time: number;
}

type TField = 1 | 2 | 3 | 4;

export enum EState {
  ACTIVE = "Active",
  CANCELED = "Canceled",
}
