import { EState, ITurn } from "../interface/Turn";

let turns: ITurn[] = [
  {
    id_turn: 1,
    id_client: 1,
    id_admin: 2,
    id_fields: [1, 3],
    date: new Date().getTime() + 200000,
    state: EState.ACTIVE,
    start_time: 840,
    finish_time: 900,
  },
  {
    id_turn: 2,
    id_client: 1,
    id_admin: 2,
    id_fields: [1, 3],
    date: new Date().getTime() + 100000,
    state: EState.ACTIVE,
    start_time: 450,
    finish_time: 600,
  },
];

export const setTurns = (newTurns: ITurn[]) => {
  turns = newTurns;
};

export default turns;
