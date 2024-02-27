import { DatabaseSetPlayerDiceUsecase } from '@data/usecases';
import { SetPlayerDiceUsecase } from '@domain/usecases';

import { makeDatabase, makePlayersTableGenerator } from '@main/factories';

export function makeDatabaseSetPlayerDiceUsecase(): SetPlayerDiceUsecase {
  const database = makeDatabase();
  const tableGenerator = makePlayersTableGenerator();

  return new DatabaseSetPlayerDiceUsecase({
    database,
    tableGenerator,
  });
}
