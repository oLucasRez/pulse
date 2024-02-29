import { CRUDGetMeUsecase } from '@data/usecases';
import { GetMeUsecase } from '@domain/usecases';

import { makeSessionGetter, makeUserCRUD } from '@main/factories';

export function makeCRUDGetMeUsecase(): GetMeUsecase {
  const sessionGetter = makeSessionGetter();
  const userCRUD = makeUserCRUD();

  return new CRUDGetMeUsecase({
    sessionGetter,
    userCRUD,
  });
}
