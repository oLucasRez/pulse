import { IGetDiceUsecase } from '@domain/usecases';

import { GetDiceUsecase } from '@data/usecases';

import { makeDiceDAO, makeDiceHydrator } from '@main/factories';

export function makeGetDiceUsecase(): IGetDiceUsecase {
  const diceDAO = makeDiceDAO();
  const diceHydrator = makeDiceHydrator();

  return new GetDiceUsecase({ diceDAO, diceHydrator });
}
