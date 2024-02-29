import { CRUDSetCurrentGameUsecase } from '@data/usecases';
import { SetCurrentGameUsecase } from '@domain/usecases';

import { makeGetMeUsecase, makeUserCRUD } from '@main/factories';

export function makeCRUDSetCurrentGameUsecase(): SetCurrentGameUsecase {
  const getMe = makeGetMeUsecase();
  const userCRUD = makeUserCRUD();

  return new CRUDSetCurrentGameUsecase({
    getMe,
    userCRUD,
  });
}
