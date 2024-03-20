import { GetDiceUsecase } from '@domain/usecases';

import { DAOGetDiceUsecase } from '@data/usecases';

import { makeDiceDAO, makeFetchDicePublisher } from '@main/factories';

export function makeDAOGetDiceUsecase(): GetDiceUsecase {
  const diceDAO = makeDiceDAO();
  const fetchDicePublisher = makeFetchDicePublisher();

  return new DAOGetDiceUsecase({ diceDAO, fetchDicePublisher });
}
