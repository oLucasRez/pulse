import { IGetMeUsecase } from '@domain/usecases';

import { GetMeUsecase } from '@data/usecases';

import {
  makeFetchMePublisher,
  makeSessionGetter,
  makeUserDAO,
} from '@main/factories';

export function makeGetMeUsecase(): IGetMeUsecase {
  const fetchMePublisher = makeFetchMePublisher();
  const sessionGetter = makeSessionGetter();
  const userDAO = makeUserDAO();

  return new GetMeUsecase({
    fetchMePublisher,
    sessionGetter,
    userDAO,
  });
}
