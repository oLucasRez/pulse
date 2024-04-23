import { ISetDicePositionUsecase } from '@domain/usecases';

import { SetDicePositionUsecase } from '@data/usecases';

import { makeDiceDAO, makeDiceHydrator } from '@main/factories';

export function makeSetDicePositionUsecase(): ISetDicePositionUsecase {
  const diceDAO = makeDiceDAO();
  const diceHydrator = makeDiceHydrator();

  return new SetDicePositionUsecase({
    diceDAO,
    diceHydrator,
  });
}
