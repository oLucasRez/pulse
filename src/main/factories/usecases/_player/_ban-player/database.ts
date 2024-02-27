import { DatabaseBanPlayerUsecase } from '@data/usecases';
import { BanPlayerUsecase } from '@domain/usecases';

import {
  makeDatabase,
  makeGetMeUsecase,
  makePlayersTableGenerator,
} from '@main/factories';

export function makeDatabaseBanPlayerUsecase(): BanPlayerUsecase {
  const database = makeDatabase();
  const getMe = makeGetMeUsecase();
  const tableGenerator = makePlayersTableGenerator();

  return new DatabaseBanPlayerUsecase({
    database,
    getMe,
    tableGenerator,
  });
}
