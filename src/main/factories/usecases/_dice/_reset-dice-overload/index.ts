import { IResetDiceOverloadUsecase } from '@domain/usecases';

import { ResetDiceOverloadUsecase } from '@data/usecases';

import { makeDiceDAO, makeDiceHydrator } from '@main/factories';

export function makeResetDiceOverloadUsecase(): IResetDiceOverloadUsecase {
  const diceDAO = makeDiceDAO();
  const diceHydrator = makeDiceHydrator();

  return new ResetDiceOverloadUsecase({ diceDAO, diceHydrator });
}
