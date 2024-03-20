import { WatchDicesUsecase } from '@domain/usecases';

import { DAOWatchDicesUsecase } from '@data/usecases';

import { makeDiceDAO, makeFetchDicesPublisher } from '@main/factories';

export function makeDAOWatchDicesUsecase(): WatchDicesUsecase {
  const diceDAO = makeDiceDAO();
  const fetchDicesPublisher = makeFetchDicesPublisher();

  return new DAOWatchDicesUsecase({ diceDAO, fetchDicesPublisher });
}
