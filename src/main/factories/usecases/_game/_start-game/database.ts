import { DatabaseStartGameUsecase } from '@data/usecases';
import { StartGameUsecase } from '@domain/usecases';

import {
  makeCreateCentralPulseUsecase,
  makeCreateDiceUsecase,
  makeDatabase,
  makeGamesTableGenerator,
  makeGetCurrentGameUsecase,
} from '@main/factories';

export function makeDatabaseStartGameUsecase(): StartGameUsecase {
  const createCentralPulse = makeCreateCentralPulseUsecase();
  const createDice = makeCreateDiceUsecase();
  const database = makeDatabase();
  const tableGenerator = makeGamesTableGenerator();
  const getCurrentGame = makeGetCurrentGameUsecase();

  return new DatabaseStartGameUsecase({
    createCentralPulse,
    createDice,
    database,
    tableGenerator,
    getCurrentGame,
  });
}
