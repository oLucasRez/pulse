import { DatabaseBanPlayerUsecase } from '@data/usecases';
import { BanPlayerUsecase } from '@domain/usecases';

import {
  makeDatabase,
  makeGetCurrentGameUsecase,
  makeGetMeUsecase,
  makePlayersTableGenerator,
} from '@main/factories';

export function makeDatabaseBanPlayerUsecase(): BanPlayerUsecase {
  const database = makeDatabase();
  const getCurrentGame = makeGetCurrentGameUsecase();
  const getMe = makeGetMeUsecase();
  const tableGenerator = makePlayersTableGenerator();

  return new DatabaseBanPlayerUsecase({
    database,
    getCurrentGame,
    getMe,
    tableGenerator,
  });
}
