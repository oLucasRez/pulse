import { WatchDicesUsecase } from '@domain/usecases';

import { DAOWatchDicesUsecase } from '@data/usecases';

import { makeDiceDAO } from '@main/factories';

export function makeDAOWatchDicesUsecase(): WatchDicesUsecase {
  const diceDAO = makeDiceDAO();

  return new DAOWatchDicesUsecase({ diceDAO });
}
