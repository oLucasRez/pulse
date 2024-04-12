import { ISetCurrentGameUsecase } from '@domain/usecases';

import { SetCurrentGameUsecase } from '@data/usecases';

import {
  makeChangeCurrentGamePublisher,
  makeGetGameUsecase,
  makeGetMeUsecase,
  makeUserDAO,
} from '@main/factories';

export function makeSetCurrentGameUsecase(): ISetCurrentGameUsecase {
  const changeCurrentGamePublisher = makeChangeCurrentGamePublisher();
  const getGame = makeGetGameUsecase();
  const getMe = makeGetMeUsecase();
  const userDAO = makeUserDAO();

  return new SetCurrentGameUsecase({
    changeCurrentGamePublisher,
    getGame,
    getMe,
    userDAO,
  });
}
