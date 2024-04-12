import { IGetCentralPulseUsecase } from '@domain/usecases';

import { GetCentralPulseUsecase } from '@data/usecases';

import {
  makeCentralPulseDAO,
  makeFetchCentralPulsePublisher,
  makeGetCurrentGameUsecase,
} from '@main/factories';

export function makeGetCentralPulseUsecase(): IGetCentralPulseUsecase {
  const centralPulseDAO = makeCentralPulseDAO();
  const fetchCentralPulsePublisher = makeFetchCentralPulsePublisher();
  const getCurrentGame = makeGetCurrentGameUsecase();

  return new GetCentralPulseUsecase({
    centralPulseDAO,
    fetchCentralPulsePublisher,
    getCurrentGame,
  });
}
