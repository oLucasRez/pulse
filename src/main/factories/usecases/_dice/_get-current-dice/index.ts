import { IGetCurrentDiceUsecase } from '@domain/usecases';

import { GetCurrentDiceUsecase } from '@data/usecases';

import {
  makeGetCurrentGameUsecase,
  makeGetCurrentPlayerUsecase,
  makeGetDiceUsecase,
} from '@main/factories';

export function makeGetCurrentDiceUsecase(): IGetCurrentDiceUsecase {
  const getCurrentGame = makeGetCurrentGameUsecase();
  const getCurrentPlayer = makeGetCurrentPlayerUsecase();
  const getDice = makeGetDiceUsecase();

  return new GetCurrentDiceUsecase({
    getCurrentGame,
    getCurrentPlayer,
    getDice,
  });
}
