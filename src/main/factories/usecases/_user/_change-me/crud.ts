import { CRUDChangeMeUsecase } from '@data/usecases';
import { ChangeMeUsecase } from '@domain/usecases';

import {
  makeAuthPublisher,
  makeGetMeUsecase,
  makeUserCRUD,
} from '@main/factories';

export function makeCRUDChangeMeUsecase(): ChangeMeUsecase {
  const authPublisher = makeAuthPublisher();
  const getMe = makeGetMeUsecase();
  const userCRUD = makeUserCRUD();

  return new CRUDChangeMeUsecase({
    authPublisher,
    getMe,
    userCRUD,
  });
}
