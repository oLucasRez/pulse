import { DatabaseCreatePlayerUsecase } from '@data/usecases';
import { CreatePlayerUsecase } from '@domain/usecases';

import {
  makeDatabase,
  makeGetCurrentGameUsecase,
  makeGetMeUsecase,
  makeGetPlayersUsecase,
  makePlayersTableGenerator,
} from '@main/factories';

export function makeDatabaseCreatePlayerUsecase(): CreatePlayerUsecase {
  const database = makeDatabase();
  const getCurrentGame = makeGetCurrentGameUsecase();
  const getMe = makeGetMeUsecase();
  const getPlayers = makeGetPlayersUsecase();
  const tableGenerator = makePlayersTableGenerator();

  return new DatabaseCreatePlayerUsecase({
    database,
    getCurrentGame,
    getMe,
    getPlayers,
    tableGenerator,
  });
}
