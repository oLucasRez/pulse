import { IChangeMeUsecase } from '@domain/usecases';

import { ChangeMeUsecase } from '@data/usecases';

import {
  makeGetMeUsecase,
  makeUserDAO,
  makeUserHydrator,
} from '@main/factories';

export function makeChangeMeUsecase(): IChangeMeUsecase {
  const getMe = makeGetMeUsecase();
  const userDAO = makeUserDAO();
  const userHydrator = makeUserHydrator();

  return new ChangeMeUsecase({
    getMe,
    userDAO,
    userHydrator,
  });
}
