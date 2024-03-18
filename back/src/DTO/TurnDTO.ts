import { UUID } from "crypto";
import { EState } from "../interface/Turn";

interface TurnDTO {
  id_turn?: string;
  id_client: string;
  date: string;
  state?: EState;
  start_time: number;
  finish_time: number;
  id_fields: UUID[];
}

export default TurnDTO;
