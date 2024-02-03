import { DatabaseGetGameUsecase } from '@data/usecases';
import { GetGameUsecase } from '@domain/usecases';

import { makeFirebaseDatabase, makeGamesTableGenerator } from '@main/factories';

export function makeDatabaseGetGameUsecase(): GetGameUsecase {
  const database = makeFirebaseDatabase();
  const tableGenerator = makeGamesTableGenerator();

  return new DatabaseGetGameUsecase({ database, tableGenerator });
}
