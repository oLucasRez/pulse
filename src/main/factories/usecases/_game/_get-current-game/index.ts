import { IGetCurrentGameUsecase } from '@domain/usecases';

import { GetCurrentGameUsecase } from '@data/usecases';

import {
  makeFetchGamePublisher,
  makeGameDAO,
  makeGetMeUsecase,
} from '@main/factories';

export function makeGetCurrentGameUsecase(): IGetCurrentGameUsecase {
  const gameDAO = makeGameDAO();
  const fetchGamePublisher = makeFetchGamePublisher();
  const getMe = makeGetMeUsecase();

  return new GetCurrentGameUsecase({
    gameDAO,
    fetchGamePublisher,
    getMe,
  });
}
