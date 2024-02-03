import { DatabaseCreatePlayerUsecase } from '@data/usecases';
import { CreatePlayerUsecase } from '@domain/usecases';

import {
  makeChangeDiceUsecase,
  makeDeletePlayerUsecase,
  makeFirebaseDatabase,
  makeGetDiceUsecase,
  makeGetPlayersUsecase,
  makePlayersTableGenerator,
} from '@main/factories';

export function makeDatabaseCreatePlayerUsecase(): CreatePlayerUsecase {
  const changeDice = makeChangeDiceUsecase();
  const deletePlayer = makeDeletePlayerUsecase();
  const database = makeFirebaseDatabase();
  const getDice = makeGetDiceUsecase();
  const getPlayers = makeGetPlayersUsecase();
  const tableGenerator = makePlayersTableGenerator();

  return new DatabaseCreatePlayerUsecase({
    changeDice,
    deletePlayer,
    database,
    getDice,
    getPlayers,
    tableGenerator,
  });
}
