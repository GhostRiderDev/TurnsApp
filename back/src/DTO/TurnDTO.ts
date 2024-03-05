import { UUID } from "crypto";
import { EState } from "../interface/Turn";

interface TurnDTO {
  id_turn?: string;
  id_client: string;
  id_admin: string;
  date: number;
  state?: EState;
  start_time: number;
  finish_time: number;
  id_fields: UUID[];
}

export default TurnDTO;
