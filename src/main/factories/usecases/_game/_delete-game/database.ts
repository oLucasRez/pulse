import { DatabaseDeleteGameUsecase } from '@data/usecases';
import { DeleteGameUsecase } from '@domain/usecases';

import { makeFirebaseDatabase, makeGamesTableGenerator } from '@main/factories';

export function makeDatabaseDeleteGameUsecase(): DeleteGameUsecase {
  const tableGenerator = makeGamesTableGenerator();
  const database = makeFirebaseDatabase();

  return new DatabaseDeleteGameUsecase({ tableGenerator, database });
}
