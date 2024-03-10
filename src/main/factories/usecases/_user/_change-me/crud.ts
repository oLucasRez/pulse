import { CRUDChangeMeUsecase } from '@data/usecases';
import { ChangeMeUsecase } from '@domain/usecases';

import {
  makeChangeMePublisher,
  makeGetMeUsecase,
  makeUserCRUD,
} from '@main/factories';

export function makeCRUDChangeMeUsecase(): ChangeMeUsecase {
  const changeMePublisher = makeChangeMePublisher();
  const getMe = makeGetMeUsecase();
  const userCRUD = makeUserCRUD();

  return new CRUDChangeMeUsecase({
    changeMePublisher,
    getMe,
    userCRUD,
  });
}
