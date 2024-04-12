import { IWatchDicesUsecase } from '@domain/usecases';

import { WatchDicesUsecase } from '@data/usecases';

import { makeDiceDAO, makeFetchDicesPublisher } from '@main/factories';

export function makeWatchDicesUsecase(): IWatchDicesUsecase {
  const diceDAO = makeDiceDAO();
  const fetchDicesPublisher = makeFetchDicesPublisher();

  return new WatchDicesUsecase({ diceDAO, fetchDicesPublisher });
}
