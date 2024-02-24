import { DatabaseChangeGameUsecase } from '@data/usecases';
import { ChangeGameUsecase } from '@domain/usecases';

import {
  makeDatabase,
  makeGamesTableGenerator,
  makeGetCurrentGameUsecase,
} from '@main/factories';

export function makeDatabaseChangeGameUsecase(): ChangeGameUsecase {
  const database = makeDatabase();
  const tableGenerator = makeGamesTableGenerator();
  const getCurrentGame = makeGetCurrentGameUsecase();

  return new DatabaseChangeGameUsecase({
    database,
    tableGenerator,
    getCurrentGame,
  });
}
