import { CRUDSetCurrentGameUsecase } from '@data/usecases';
import { SetCurrentGameUsecase } from '@domain/usecases';

import {
  makeAuthPublisher,
  makeGamePublisher,
  makeGetGameUsecase,
  makeGetMeUsecase,
  makeUserCRUD,
} from '@main/factories';

export function makeCRUDSetCurrentGameUsecase(): SetCurrentGameUsecase {
  const authPublisher = makeAuthPublisher();
  const gamePublisher = makeGamePublisher();
  const getGame = makeGetGameUsecase();
  const getMe = makeGetMeUsecase();
  const userCRUD = makeUserCRUD();

  return new CRUDSetCurrentGameUsecase({
    authPublisher,
    gamePublisher,
    getGame,
    getMe,
    userCRUD,
  });
}
