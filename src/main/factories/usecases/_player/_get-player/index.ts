import { IGetPlayerUsecase } from '@domain/usecases';

import { GetPlayerUsecase } from '@data/usecases';

import { makeFetchPlayerPublisher, makePlayerDAO } from '@main/factories';

export function makeGetPlayerUsecase(): IGetPlayerUsecase {
  const playerDAO = makePlayerDAO();
  const fetchPlayerPublisher = makeFetchPlayerPublisher();

  return new GetPlayerUsecase({ playerDAO, fetchPlayerPublisher });
}
