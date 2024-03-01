import { EState, ITurn } from "../interface/Turn";
import turns from "../DAO/TurnDAO";
import TurnNotFoundError from "../Error/TurnNotFoundError";
import { setTurns } from "../DAO/TurnDAO";

export const findTurns = async (): Promise<ITurn[]> => {
  return turns;
};

export const findTurn = async (id_turn: number): Promise<ITurn> => {
  const turnFound = turns.find((turn) => turn.id_turn === id_turn);
  if (!turnFound) {
    throw new TurnNotFoundError();
  }
  return turnFound;
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

  const turnsUpdated = turns.map((turn) =>
    turn.id_turn !== id_turn ? turnToUpdate : turn
  );
  setTurns(turnsUpdated);
  return turnToUpdate;
};

export const removeTurn = async (id_turn: number): Promise<void> => {
  const turnToCanceled = await findTurn(id_turn);
  (await turnToCanceled).state = EState.CANCELED;
  setTurns(
    turns.map((turn) => (turn.id_turn !== id_turn ? turn : turnToCanceled))
  );
};
