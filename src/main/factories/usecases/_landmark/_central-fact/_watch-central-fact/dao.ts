import { WatchCentralFactUsecase } from '@domain/usecases';

import { DAOWatchCentralFactUsecase } from '@data/usecases';

import { makeCentralFactDAO } from '@main/factories';

export function makeDAOWatchCentralFactUsecase(): WatchCentralFactUsecase {
  const centralFactDAO = makeCentralFactDAO();

  return new DAOWatchCentralFactUsecase({ centralFactDAO });
}
