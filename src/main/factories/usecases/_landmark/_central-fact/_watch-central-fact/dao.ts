import { WatchCentralFactUsecase } from '@domain/usecases';

import { DAOWatchCentralFactUsecase } from '@data/usecases';

import {
  makeCentralFactDAO,
  makeFetchCentralFactPublisher,
} from '@main/factories';

export function makeDAOWatchCentralFactUsecase(): WatchCentralFactUsecase {
  const centralFactDAO = makeCentralFactDAO();
  const fetchCentralFactPublisher = makeFetchCentralFactPublisher();

  return new DAOWatchCentralFactUsecase({
    centralFactDAO,
    fetchCentralFactPublisher,
  });
}
