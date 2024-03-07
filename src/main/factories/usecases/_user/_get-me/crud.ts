import { CRUDGetMeUsecase } from '@data/usecases';
import { GetMeUsecase } from '@domain/usecases';

import {
  makeAuthPublisher,
  makeSessionGetter,
  makeUserCRUD,
} from '@main/factories';

export function makeCRUDGetMeUsecase(): GetMeUsecase {
  const authPublisher = makeAuthPublisher();
  const sessionGetter = makeSessionGetter();
  const userCRUD = makeUserCRUD();

  return new CRUDGetMeUsecase({
    authPublisher,
    sessionGetter,
    userCRUD,
  });
}
