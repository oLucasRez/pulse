import { DatabaseCreatePlayerUsecase } from '@data/usecases';
import { CreatePlayerUsecase } from '@domain/usecases';

import {
  makeDatabase,
  makeGetMeUsecase,
  makeGetPlayersUsecase,
  makePlayersTableGenerator,
} from '@main/factories';

export function makeDatabaseCreatePlayerUsecase(): CreatePlayerUsecase {
  const database = makeDatabase();
  const getMe = makeGetMeUsecase();
  const getPlayers = makeGetPlayersUsecase();
  const tableGenerator = makePlayersTableGenerator();

  return new DatabaseCreatePlayerUsecase({
    database,
    getMe,
    getPlayers,
    tableGenerator,
  });
}
