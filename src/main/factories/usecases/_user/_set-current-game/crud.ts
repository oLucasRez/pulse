import { SetCurrentGameUsecase } from '@domain/usecases';

import { DAOSetCurrentGameUsecase } from '@data/usecases';

import {
  makeChangeMePublisher,
  makeFetchCurrentGamePublisher,
  makeGetGameUsecase,
  makeGetMeUsecase,
  makeUserDAO,
} from '@main/factories';

export function makeDAOSetCurrentGameUsecase(): SetCurrentGameUsecase {
  const changeMePublisher = makeChangeMePublisher();
  const fetchCurrentGamePublisher = makeFetchCurrentGamePublisher();
  const getGame = makeGetGameUsecase();
  const getMe = makeGetMeUsecase();
  const userDAO = makeUserDAO();

  return new DAOSetCurrentGameUsecase({
    changeMePublisher,
    fetchCurrentGamePublisher,
    getGame,
    getMe,
    userDAO,
  });
}
