import { DatabaseDeleteGameUsecase } from '@data/usecases';
import { DeleteGameUsecase } from '@domain/usecases';

import { makeFirebaseDatabase, makeGamesTableGenerator } from '@main/factories';

export function makeDatabaseDeleteGameUsecase(): DeleteGameUsecase {
  const database = makeFirebaseDatabase();
  const tableGenerator = makeGamesTableGenerator();

  return new DatabaseDeleteGameUsecase({ database, tableGenerator });
}
