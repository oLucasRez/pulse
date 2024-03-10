import { ChangeMeUsecase } from '@domain/usecases';

import { DAOChangeMeUsecase } from '@data/usecases';

import {
  makeChangeMePublisher,
  makeGetMeUsecase,
  makeUserDAO,
} from '@main/factories';

export function makeDAOChangeMeUsecase(): ChangeMeUsecase {
  const changeMePublisher = makeChangeMePublisher();
  const getMe = makeGetMeUsecase();
  const userDAO = makeUserDAO();

  return new DAOChangeMeUsecase({
    changeMePublisher,
    getMe,
    userDAO,
  });
}
