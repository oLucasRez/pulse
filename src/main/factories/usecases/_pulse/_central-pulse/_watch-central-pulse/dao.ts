import { WatchCentralPulseUsecase } from '@domain/usecases';

import { DAOWatchCentralPulseUsecase } from '@data/usecases';

import { makeCentralPulseDAO } from '@main/factories';

export function makeDAOWatchCentralPulseUsecase(): WatchCentralPulseUsecase {
  const centralPulseDAO = makeCentralPulseDAO();

  return new DAOWatchCentralPulseUsecase({ centralPulseDAO });
}
