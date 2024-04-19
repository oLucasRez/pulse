import { ICreateDiceUsecase } from '@domain/usecases';

import { CreateDiceUsecase } from '@data/usecases';

import { makeDiceDAO, makeDiceHydrator } from '@main/factories';

export function makeCreateDiceUsecase(): ICreateDiceUsecase {
  const diceDAO = makeDiceDAO();
  const diceHydrator = makeDiceHydrator();

  return new CreateDiceUsecase({ diceDAO, diceHydrator });
}
