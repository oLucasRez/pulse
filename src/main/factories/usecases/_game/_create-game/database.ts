import { DatabaseCreateGameUsecase } from '@data/usecases';
import { CreateGameUsecase } from '@domain/usecases';

import {
  makeCreateCentralPulseUsecase,
  makeDeleteGameUsecase,
  makeFirebaseDatabase,
  makeGamesTableGenerator,
} from '@main/factories';

export function makeDatabaseCreateGameUsecase(): CreateGameUsecase {
  const createCentralPulse = makeCreateCentralPulseUsecase();
  const deleteGame = makeDeleteGameUsecase();
  const database = makeFirebaseDatabase();
  const tableGenerator = makeGamesTableGenerator();

  return new DatabaseCreateGameUsecase({
    createCentralPulse,
    deleteGame,
    database,
    tableGenerator,
  });
}
