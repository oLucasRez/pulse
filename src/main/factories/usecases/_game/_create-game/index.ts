import { ICreateGameUsecase } from '@domain/usecases';

import { CreateGameUsecase } from '@data/usecases';

import {
  makeCreateGamePublisher,
  makeGameDAO,
  makeGetMeUsecase,
} from '@main/factories';

export function makeCreateGameUsecase(): ICreateGameUsecase {
  const gameDAO = makeGameDAO();
  const createGamePublisher = makeCreateGamePublisher();
  const getMe = makeGetMeUsecase();

  return new CreateGameUsecase({ gameDAO, createGamePublisher, getMe });
}
