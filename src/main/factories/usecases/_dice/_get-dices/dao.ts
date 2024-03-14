import { GetDicesUsecase } from '@domain/usecases';

import { DAOGetDicesUsecase } from '@data/usecases';

import { makeDiceDAO } from '@main/factories';

export function makeDAOGetDicesUsecase(): GetDicesUsecase {
  const diceDAO = makeDiceDAO();

  return new DAOGetDicesUsecase({ diceDAO });
}
