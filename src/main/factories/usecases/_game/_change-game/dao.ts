import { ChangeGameUsecase } from '@domain/usecases';

import { DAOChangeGameUsecase } from '@data/usecases';

import {
  makeChangeGamePublisher,
  makeGameDAO,
  makeGetCurrentGameUsecase,
} from '@main/factories';

export function makeDAOChangeGameUsecase(): ChangeGameUsecase {
  const gameDAO = makeGameDAO();
  const changeGamePublisher = makeChangeGamePublisher();
  const getCurrentGame = makeGetCurrentGameUsecase();

  return new DAOChangeGameUsecase({
    gameDAO,
    changeGamePublisher,
    getCurrentGame,
  });
}
