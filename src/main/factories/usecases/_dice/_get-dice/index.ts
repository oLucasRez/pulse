import { IGetDiceUsecase } from '@domain/usecases';

import { GetDiceUsecase } from '@data/usecases';

import { makeDiceDAO, makeFetchDicePublisher } from '@main/factories';

export function makeGetDiceUsecase(): IGetDiceUsecase {
  const diceDAO = makeDiceDAO();
  const fetchDicePublisher = makeFetchDicePublisher();

  return new GetDiceUsecase({ diceDAO, fetchDicePublisher });
}
