import { SetCurrentGame } from '@data/usecases';
import { SetCurrentGameUsecase } from '@domain/usecases';

import { makeGetMeUsecase, makeUserCRUD } from '@main/factories';

export function makeSetCurrentGameUsecase(): SetCurrentGameUsecase {
  const getMe = makeGetMeUsecase();
  const userCRUD = makeUserCRUD();

  return new SetCurrentGame({
    getMe,
    userCRUD,
  });
}
