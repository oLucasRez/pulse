import { IWatchCentralFactUsecase } from '@domain/usecases';

import { WatchCentralFactUsecase } from '@data/usecases';

import {
  makeCentralFactDAO,
  makeFetchCentralFactPublisher,
} from '@main/factories';

export function makeWatchCentralFactUsecase(): IWatchCentralFactUsecase {
  const centralFactDAO = makeCentralFactDAO();
  const fetchCentralFactPublisher = makeFetchCentralFactPublisher();

  return new WatchCentralFactUsecase({
    centralFactDAO,
    fetchCentralFactPublisher,
  });
}
