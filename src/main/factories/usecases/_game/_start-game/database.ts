import { DatabaseStartGameUsecase } from '@data/usecases';
import { StartGameUsecase } from '@domain/usecases';

import {
  makeChangeUserUsecase,
  makeCreateCentralPulseUsecase,
  makeCreateDiceUsecase,
  makeGetCurrentGameUsecase,
} from '@main/factories';

export function makeDatabaseStartGameUsecase(): StartGameUsecase {
  const changeUser = makeChangeUserUsecase();
  const createCentralPulse = makeCreateCentralPulseUsecase();
  const createDice = makeCreateDiceUsecase();
  const getCurrentGame = makeGetCurrentGameUsecase();

  return new DatabaseStartGameUsecase({
    changeUser,
    createCentralPulse,
    createDice,
    getCurrentGame,
  });
}
