import { ChangeMe } from '@data/usecases';
import { ChangeMeUsecase } from '@domain/usecases';

import { makeGetMeUsecase, makeUserCRUD } from '@main/factories';

export function makeChangeMeUsecase(): ChangeMeUsecase {
  const getMe = makeGetMeUsecase();
  const userCRUD = makeUserCRUD();

  return new ChangeMe({
    getMe,
    userCRUD,
  });
}
