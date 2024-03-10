import { CreateDiceUsecase } from '@domain/usecases';

import { DAOCreateDiceUsecase } from '@data/usecases';

import { makeDiceDAO } from '@main/factories';

export function makeDAOCreateDiceUsecase(): CreateDiceUsecase {
  const diceDAO = makeDiceDAO();

  return new DAOCreateDiceUsecase({ diceDAO });
}
