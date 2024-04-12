import { IChangeGameUsecase } from '@domain/usecases';

import { ChangeGameUsecase } from '@data/usecases';

import {
  makeChangeGamePublisher,
  makeGameDAO,
  makeGetCurrentGameUsecase,
} from '@main/factories';

export function makeChangeGameUsecase(): IChangeGameUsecase {
  const gameDAO = makeGameDAO();
  const changeGamePublisher = makeChangeGamePublisher();
  const getCurrentGame = makeGetCurrentGameUsecase();

  return new ChangeGameUsecase({
    gameDAO,
    changeGamePublisher,
    getCurrentGame,
  });
}
