import { WatchCentralPulseUsecase } from '@domain/usecases';

import { DAOWatchCentralPulseUsecase } from '@data/usecases';

import {
  makeCentralPulseDAO,
  makeFetchCentralPulsePublisher,
} from '@main/factories';

export function makeDAOWatchCentralPulseUsecase(): WatchCentralPulseUsecase {
  const centralPulseDAO = makeCentralPulseDAO();
  const fetchCentralPulsePublisher = makeFetchCentralPulsePublisher();

  return new DAOWatchCentralPulseUsecase({
    centralPulseDAO,
    fetchCentralPulsePublisher,
  });
}
