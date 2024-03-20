import { GetDicesUsecase } from '@domain/usecases';

import { DAOGetDicesUsecase } from '@data/usecases';

import { makeDiceDAO, makeFetchDicesPublisher } from '@main/factories';

export function makeDAOGetDicesUsecase(): GetDicesUsecase {
  const diceDAO = makeDiceDAO();
  const fetchDicesPublisher = makeFetchDicesPublisher();

  return new DAOGetDicesUsecase({ diceDAO, fetchDicesPublisher });
}
