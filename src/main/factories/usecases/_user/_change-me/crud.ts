import { CRUDChangeMeUsecase } from '@data/usecases';
import { ChangeMeUsecase } from '@domain/usecases';

import { makeGetMeUsecase, makeUserCRUD } from '@main/factories';

export function makeCRUDChangeMeUsecase(): ChangeMeUsecase {
  const getMe = makeGetMeUsecase();
  const userCRUD = makeUserCRUD();

  return new CRUDChangeMeUsecase({
    getMe,
    userCRUD,
  });
}
