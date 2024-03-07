import { CRUDSetCurrentGameUsecase } from '@data/usecases';
import { SetCurrentGameUsecase } from '@domain/usecases';

import {
  makeAuthPublisher,
  makeGetMeUsecase,
  makeUserCRUD,
} from '@main/factories';

export function makeCRUDSetCurrentGameUsecase(): SetCurrentGameUsecase {
  const authPublisher = makeAuthPublisher();
  const getMe = makeGetMeUsecase();
  const userCRUD = makeUserCRUD();

  return new CRUDSetCurrentGameUsecase({
    authPublisher,
    getMe,
    userCRUD,
  });
}
