import { IWatchCentralFactUsecase } from '@domain/usecases';

import { WatchCentralFactUsecase } from '@data/usecases';

import { makeCentralFactDAO, makeCentralFactHydrator } from '@main/factories';

export function makeWatchCentralFactUsecase(): IWatchCentralFactUsecase {
  const centralFactDAO = makeCentralFactDAO();
  const centralFactHydrator = makeCentralFactHydrator();

  return new WatchCentralFactUsecase({
    centralFactDAO,
    centralFactHydrator,
  });
}
