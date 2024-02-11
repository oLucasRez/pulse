import { DatabaseCreatePlayerUsecase } from '@data/usecases';
import { CreatePlayerUsecase } from '@domain/usecases';

import {
  makeCache,
  makeDatabase,
  makeGetCurrentGameUsecase,
  makeGetMeUsecase,
  makeGetPlayersUsecase,
  makePlayersTableGenerator,
} from '@main/factories';

export function makeDatabaseCreatePlayerUsecase(): CreatePlayerUsecase {
  const cache = makeCache();
  const database = makeDatabase();
  const getCurrentGame = makeGetCurrentGameUsecase();
  const getMe = makeGetMeUsecase();
  const getPlayers = makeGetPlayersUsecase();
  const tableGenerator = makePlayersTableGenerator();

  return new DatabaseCreatePlayerUsecase({
    cache,
    database,
    getCurrentGame,
    getMe,
    getPlayers,
    tableGenerator,
  });
}
