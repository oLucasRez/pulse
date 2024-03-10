import { CreateGameUsecase } from '@domain/usecases';

import { DAOCreateGameUsecase } from '@data/usecases';

import {
  makeCreateGamePublisher,
  makeGameDAO,
  makeGetMeUsecase,
} from '@main/factories';

export function makeDAOCreateGameUsecase(): CreateGameUsecase {
  const gameDAO = makeGameDAO();
  const createGamePublisher = makeCreateGamePublisher();
  const getMe = makeGetMeUsecase();

  return new DAOCreateGameUsecase({ gameDAO, createGamePublisher, getMe });
}
