import { IChangeMeUsecase } from '@domain/usecases';

import { ChangeMeUsecase } from '@data/usecases';

import {
  makeChangeMePublisher,
  makeGetMeUsecase,
  makeUserDAO,
} from '@main/factories';

export function makeChangeMeUsecase(): IChangeMeUsecase {
  const changeMePublisher = makeChangeMePublisher();
  const getMe = makeGetMeUsecase();
  const userDAO = makeUserDAO();

  return new ChangeMeUsecase({
    changeMePublisher,
    getMe,
    userDAO,
  });
}
