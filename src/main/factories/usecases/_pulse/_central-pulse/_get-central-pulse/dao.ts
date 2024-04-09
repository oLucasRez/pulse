import { GetCentralPulseUsecase } from '@domain/usecases';

import { DAOGetCentralPulseUsecase } from '@data/usecases';

import {
  makeCentralPulseDAO,
  makeFetchCentralPulsePublisher,
  makeGetCurrentGameUsecase,
} from '@main/factories';

export function makeDAOGetCentralPulseUsecase(): GetCentralPulseUsecase {
  const centralPulseDAO = makeCentralPulseDAO();
  const fetchCentralPulsePublisher = makeFetchCentralPulsePublisher();
  const getCurrentGame = makeGetCurrentGameUsecase();

  return new DAOGetCentralPulseUsecase({
    centralPulseDAO,
    fetchCentralPulsePublisher,
    getCurrentGame,
  });
}
