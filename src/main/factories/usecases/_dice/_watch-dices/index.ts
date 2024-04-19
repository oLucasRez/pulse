import { IWatchDicesUsecase } from '@domain/usecases';

import { WatchDicesUsecase } from '@data/usecases';

import { makeDiceDAO, makeDiceHydrator } from '@main/factories';

export function makeWatchDicesUsecase(): IWatchDicesUsecase {
  const diceDAO = makeDiceDAO();
  const diceHydrator = makeDiceHydrator();

  return new WatchDicesUsecase({ diceDAO, diceHydrator });
}
