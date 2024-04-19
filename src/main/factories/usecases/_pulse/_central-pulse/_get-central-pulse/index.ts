import { IGetCentralPulseUsecase } from '@domain/usecases';

import { GetCentralPulseUsecase } from '@data/usecases';

import {
  makeCentralPulseDAO,
  makeCentralPulseHydrator,
  makeGetCurrentGameUsecase,
} from '@main/factories';

export function makeGetCentralPulseUsecase(): IGetCentralPulseUsecase {
  const centralPulseDAO = makeCentralPulseDAO();
  const centralPulseHydrator = makeCentralPulseHydrator();
  const getCurrentGame = makeGetCurrentGameUsecase();

  return new GetCentralPulseUsecase({
    centralPulseDAO,
    centralPulseHydrator,
    getCurrentGame,
  });
}
