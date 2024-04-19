import { IGetDicesUsecase } from '@domain/usecases';

import { GetDicesUsecase } from '@data/usecases';

import { makeDiceDAO, makeDiceHydrator } from '@main/factories';

export function makeGetDicesUsecase(): IGetDicesUsecase {
  const diceDAO = makeDiceDAO();
  const diceHydrator = makeDiceHydrator();

  return new GetDicesUsecase({ diceDAO, diceHydrator });
}
