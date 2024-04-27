import { IVerifyDicesOverloadUsecase } from '@domain/usecases';

import { VerifyDicesOverloadUsecase } from '@data/usecases';

import { makeDiceDAO, makeDiceHydrator } from '@main/factories';

export function makeVerifyDicesOverloadUsecase(): IVerifyDicesOverloadUsecase {
  const diceDAO = makeDiceDAO();
  const diceHydrator = makeDiceHydrator();

  return new VerifyDicesOverloadUsecase({ diceDAO, diceHydrator });
}
