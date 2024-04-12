import { IGetPlayersUsecase } from '@domain/usecases';

import { GetPlayersUsecase } from '@data/usecases';

import { makeFetchPlayersPublisher, makePlayerDAO } from '@main/factories';

export function makeGetPlayersUsecase(): IGetPlayersUsecase {
  const playerDAO = makePlayerDAO();
  const fetchPlayersPublisher = makeFetchPlayersPublisher();

  return new GetPlayersUsecase({ playerDAO, fetchPlayersPublisher });
}
