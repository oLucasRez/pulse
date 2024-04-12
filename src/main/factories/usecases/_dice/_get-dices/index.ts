import { IGetDicesUsecase } from '@domain/usecases';

import { GetDicesUsecase } from '@data/usecases';

import { makeDiceDAO, makeFetchDicesPublisher } from '@main/factories';

export function makeGetDicesUsecase(): IGetDicesUsecase {
  const diceDAO = makeDiceDAO();
  const fetchDicesPublisher = makeFetchDicesPublisher();

  return new GetDicesUsecase({ diceDAO, fetchDicesPublisher });
}
