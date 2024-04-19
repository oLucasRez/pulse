import { IGetCurrentDiceUsecase } from '@domain/usecases';

import { GetCurrentDiceUsecase } from '@data/usecases';

import {
  makeGetCurrentPlayerUsecase,
  makeGetDiceUsecase,
} from '@main/factories';

export function makeGetCurrentDiceUsecase(): IGetCurrentDiceUsecase {
  const getCurrentPlayer = makeGetCurrentPlayerUsecase();
  const getDice = makeGetDiceUsecase();

  return new GetCurrentDiceUsecase({
    getCurrentPlayer,
    getDice,
  });
}
