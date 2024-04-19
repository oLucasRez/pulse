import { IWatchCentralPulseUsecase } from '@domain/usecases';

import { WatchCentralPulseUsecase } from '@data/usecases';

import { makeCentralPulseDAO, makeCentralPulseHydrator } from '@main/factories';

export function makeWatchCentralPulseUsecase(): IWatchCentralPulseUsecase {
  const centralPulseDAO = makeCentralPulseDAO();
  const centralPulseHydrator = makeCentralPulseHydrator();

  return new WatchCentralPulseUsecase({
    centralPulseDAO,
    centralPulseHydrator,
  });
}
