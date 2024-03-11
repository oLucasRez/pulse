import { SetCurrentGameUsecase } from '@domain/usecases';

import { DAOSetCurrentGameUsecase } from '@data/usecases';

import {
  makeChangeCurrentGamePublisher,
  makeGetGameUsecase,
  makeGetMeUsecase,
  makeUserDAO,
} from '@main/factories';

export function makeDAOSetCurrentGameUsecase(): SetCurrentGameUsecase {
  const changeCurrentGamePublisher = makeChangeCurrentGamePublisher();
  const getGame = makeGetGameUsecase();
  const getMe = makeGetMeUsecase();
  const userDAO = makeUserDAO();

  return new DAOSetCurrentGameUsecase({
    changeCurrentGamePublisher,
    getGame,
    getMe,
    userDAO,
  });
}
