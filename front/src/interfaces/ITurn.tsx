import { UUID } from "crypto";

export enum EState {
  ACTIVE = "Active",
  CANCELED = "Canceled",
}

interface ITurn {
  id_turn?: string;
  id_client: string;
  date: string;
  state?: EState;
  start_time: number;
  finish_time: number;
  id_fields: UUID[];
}

export default ITurn;
