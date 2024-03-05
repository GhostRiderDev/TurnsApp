import { EState, ITurn } from "../interface/Turn";
import TurnNotFoundError from "../Error/ResourceNotFoundError";
import TurnEntity from "../entity/TurnEntity";
import FieldEntity from "../entity/FieldEntity";
import { getFieldsByIds } from "./FieldService";
import TurnDTO from "../DTO/TurnDTO";
import { TurnDAO } from "../repository/repositories";
import { numberToDate } from "../utils/DateConverter";

export const findTurns = async (): Promise<ITurn[]> => {
  const turns: TurnEntity[] = await TurnDAO.find();
  const turnsToReturn: ITurn[] = turns.map((turnDB) => {
    const turnToReturn: ITurn = convertDBtoReturn(turnDB);
    return turnToReturn;
  });
  return turnsToReturn as ITurn[];
};

export const findTurn = async (id_turn: string): Promise<ITurn> => {
  const turnFound = await TurnDAO.findOneBy({
    id_turn: id_turn,
  });
  if (!turnFound) {
    throw new TurnNotFoundError();
  }

  const turnToReturn: ITurn = convertDBtoReturn(turnFound);
  return turnToReturn;
};

export const addTurn = async (turnToAdd: TurnDTO): Promise<ITurn> => {
  const turnFromEntity = new TurnEntity();

  const fieldsEntity: FieldEntity[] = await getFieldsByIds(turnToAdd.id_fields);

  turnFromEntity.id_admin = turnToAdd.id_admin;
  turnFromEntity.id_client = turnToAdd.id_client;
  turnFromEntity.date = numberToDate(turnToAdd.date);
  turnFromEntity.start_time = turnToAdd.start_time;
  turnFromEntity.finish_time = turnToAdd.finish_time;
  turnFromEntity.id_fields = fieldsEntity;
  turnFromEntity.state = EState.ACTIVE;

  const turnSaved = await TurnDAO.save(turnFromEntity);
  const turnToReturn: ITurn = convertDBtoReturn(turnSaved);
  return turnToReturn as ITurn;
};

export const updateTurn = async (id_turn: string): Promise<void> => {
  const turnToCancel = await findTurn(id_turn);
  turnToCancel.state = EState.CANCELED;
  await TurnDAO.update({ id_turn: id_turn }, { state: turnToCancel.state });
};

const convertDBtoReturn = (turnDB: TurnEntity) => {
  const turnToReturn: ITurn = {
    ...turnDB,
    date: new Date(turnDB.date).getTime(),
  };
  return turnToReturn;
};
