import { IWatchCentralPulseUsecase } from '@domain/usecases';

import { WatchCentralPulseUsecase } from '@data/usecases';

import {
  makeCentralPulseDAO,
  makeFetchCentralPulsePublisher,
} from '@main/factories';

export function makeWatchCentralPulseUsecase(): IWatchCentralPulseUsecase {
  const centralPulseDAO = makeCentralPulseDAO();
  const fetchCentralPulsePublisher = makeFetchCentralPulsePublisher();

  return new WatchCentralPulseUsecase({
    centralPulseDAO,
    fetchCentralPulsePublisher,
  });
}
