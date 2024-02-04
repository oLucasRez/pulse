import { DatabaseCreatePlayerUsecase } from '@data/usecases';
import { CreatePlayerUsecase } from '@domain/usecases';

import {
  makeChangeDiceUsecase,
  makeDatabase,
  makeDeletePlayerUsecase,
  makeGetDiceUsecase,
  makeGetPlayersUsecase,
  makePlayersTableGenerator,
} from '@main/factories';

export function makeDatabaseCreatePlayerUsecase(): CreatePlayerUsecase {
  const changeDice = makeChangeDiceUsecase();
  const database = makeDatabase();
  const deletePlayer = makeDeletePlayerUsecase();
  const getDice = makeGetDiceUsecase();
  const getPlayers = makeGetPlayersUsecase();
  const tableGenerator = makePlayersTableGenerator();

  return new DatabaseCreatePlayerUsecase({
    changeDice,
    database,
    deletePlayer,
    getDice,
    getPlayers,
    tableGenerator,
  });
}
