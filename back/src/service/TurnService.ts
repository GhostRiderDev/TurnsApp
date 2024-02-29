import { EState, ITurn } from "../interface/Turn";
import logger from "../utils/logger";

const turn: ITurn = {
  id_turn: 1,
  username_client: "olvadis2004@gmail.com",
  username_admin: "admin@admin.com",
  id_fields: [1, 3],
  date: new Date().getTime(),
  state: EState.ACTIVE,
  start_time: 840,
  finish_time: 900,
};

export const findTurns = async (): Promise<ITurn[]> => {
  return [turn];
};

export const findTurn = async (id_turn: number): Promise<ITurn> => {
  turn.id_turn = id_turn;
  return turn;
};

export const addTurn = async (turnToAdd: ITurn): Promise<ITurn> => {
  const turn = turnToAdd;
  return turn;
};

export const refreshTurn = async (
  id_turn: number,
  turnToUpdate: ITurn
): Promise<ITurn> => {
  turnToUpdate.id_turn = id_turn;
  return turnToUpdate;
};

export const removeTurn = async (id_turn: number): Promise<void> => {
  logger.info(`removed User with username=${id_turn}`);
};
