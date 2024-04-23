import { IGetCurrentLightSpotDiceUsecase } from '@domain/usecases';

import { GetCurrentLightSpotDiceUsecase } from '@data/usecases';

import {
  makeGetCurrentGameUsecase,
  makeGetCurrentPlayerUsecase,
  makeGetDiceUsecase,
} from '@main/factories';

export function makeGetCurrentLightSpotDiceUsecase(): IGetCurrentLightSpotDiceUsecase {
  const getCurrentGame = makeGetCurrentGameUsecase();
  const getCurrentPlayer = makeGetCurrentPlayerUsecase();
  const getDice = makeGetDiceUsecase();

  return new GetCurrentLightSpotDiceUsecase({
    getCurrentGame,
    getCurrentPlayer,
    getDice,
  });
}
