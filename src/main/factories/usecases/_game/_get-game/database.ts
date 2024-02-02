import { DatabaseGetGameUsecase } from '@data/usecases';
import { GetGameUsecase } from '@domain/usecases';

import { makeFirebaseDatabase, makeGamesTableGenerator } from '@main/factories';

export function makeDatabaseGetGameUsecase(): GetGameUsecase {
  const tableGenerator = makeGamesTableGenerator();
  const database = makeFirebaseDatabase();

  return new DatabaseGetGameUsecase({ tableGenerator, database });
}
