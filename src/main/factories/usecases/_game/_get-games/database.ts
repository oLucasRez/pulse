import { DatabaseGetGamesUsecase } from '@data/usecases';
import { GetGamesUsecase } from '@domain/usecases';

import {
  makeFirebaseDatabase,
  makeGamesTableGenerator,
  makeGetCurrentUserUsecase,
} from '@main/factories';

export function makeDatabaseGetGamesUsecase(): GetGamesUsecase {
  const database = makeFirebaseDatabase();
  const tableGenerator = makeGamesTableGenerator();
  const getCurrentUser = makeGetCurrentUserUsecase();

  return new DatabaseGetGamesUsecase({
    database,
    tableGenerator,
    getCurrentUser,
  });
}
