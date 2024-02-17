import { DatabaseStartGameUsecase } from '@data/usecases';
import { StartGameUsecase } from '@domain/usecases';

import {
  makeChangeMeUsecase,
  makeCreateCentralPulseUsecase,
  makeCreateDiceUsecase,
  makeGetCurrentGameUsecase,
} from '@main/factories';

export function makeDatabaseStartGameUsecase(): StartGameUsecase {
  const changeMe = makeChangeMeUsecase();
  const createCentralPulse = makeCreateCentralPulseUsecase();
  const createDice = makeCreateDiceUsecase();
  const getCurrentGame = makeGetCurrentGameUsecase();

  return new DatabaseStartGameUsecase({
    changeMe,
    createCentralPulse,
    createDice,
    getCurrentGame,
  });
}
