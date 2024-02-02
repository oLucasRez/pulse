import { DatabaseCreateGameUsecase } from '@data/usecases';
import { CreateGameUsecase } from '@domain/usecases';

import {
  makeDatabaseCreateCentralPulseUsecase,
  makeDatabaseDeleteGameUsecase,
  makeFirebaseDatabase,
  makeGamesTableGenerator,
} from '@main/factories';

export function makeDatabaseCreateGameUsecase(): CreateGameUsecase {
  const tableGenerator = makeGamesTableGenerator();
  const database = makeFirebaseDatabase();
  const deleteGame = makeDatabaseDeleteGameUsecase();
  const createCentralPulse = makeDatabaseCreateCentralPulseUsecase();

  return new DatabaseCreateGameUsecase({
    tableGenerator,
    database,
    deleteGame,
    createCentralPulse,
  });
}
