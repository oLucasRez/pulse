import { GetDiceUsecase } from '@domain/usecases';

import { DAOGetDiceUsecase } from '@data/usecases';

import { makeDiceDAO } from '@main/factories';

export function makeDAOGetDiceUsecase(): GetDiceUsecase {
  const diceDAO = makeDiceDAO();

  return new DAOGetDiceUsecase({ diceDAO });
}
