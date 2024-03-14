import { GetMeUsecase } from '@domain/usecases';

import { DAOGetMeUsecase } from '@data/usecases';

import {
  makeFetchMePublisher,
  makeSessionGetter,
  makeUserDAO,
} from '@main/factories';

export function makeDAOGetMeUsecase(): GetMeUsecase {
  const fetchMePublisher = makeFetchMePublisher();
  const sessionGetter = makeSessionGetter();
  const userDAO = makeUserDAO();

  return new DAOGetMeUsecase({
    fetchMePublisher,
    sessionGetter,
    userDAO,
  });
}
