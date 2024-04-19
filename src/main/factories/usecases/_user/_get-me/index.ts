import { IGetMeUsecase } from '@domain/usecases';

import { GetMeUsecase } from '@data/usecases';

import {
  makeSessionGetter,
  makeUserDAO,
  makeUserHydrator,
} from '@main/factories';

export function makeGetMeUsecase(): IGetMeUsecase {
  const sessionGetter = makeSessionGetter();
  const userDAO = makeUserDAO();
  const userHydrator = makeUserHydrator();

  return new GetMeUsecase({
    sessionGetter,
    userDAO,
    userHydrator,
  });
}
