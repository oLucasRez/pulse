import { IGetGameUsecase } from '@domain/usecases';

import { GetGameUsecase } from '@data/usecases';

import { makeFetchGamePublisher, makeGameDAO } from '@main/factories';

export function makeGetGameUsecase(): IGetGameUsecase {
  const gameDAO = makeGameDAO();
  const fetchGamePublisher = makeFetchGamePublisher();

  return new GetGameUsecase({ gameDAO, fetchGamePublisher });
}
