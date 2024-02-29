import { GetMe } from '@data/usecases';
import { GetMeUsecase } from '@domain/usecases';

import { makeSessionGetter, makeUserCRUD } from '@main/factories';

export function makeGetMeUsecase(): GetMeUsecase {
  const sessionGetter = makeSessionGetter();
  const userCRUD = makeUserCRUD();

  return new GetMe({
    sessionGetter,
    userCRUD,
  });
}
