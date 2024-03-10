import { CRUDSetCurrentGameUsecase } from '@data/usecases';
import { SetCurrentGameUsecase } from '@domain/usecases';

import {
  makeChangeMePublisher,
  makeGamePublisher,
  makeGetGameUsecase,
  makeGetMeUsecase,
  makeUserCRUD,
} from '@main/factories';

export function makeCRUDSetCurrentGameUsecase(): SetCurrentGameUsecase {
  const changeMePublisher = makeChangeMePublisher();
  const gamePublisher = makeGamePublisher();
  const getGame = makeGetGameUsecase();
  const getMe = makeGetMeUsecase();
  const userCRUD = makeUserCRUD();

  return new CRUDSetCurrentGameUsecase({
    changeMePublisher,
    gamePublisher,
    getGame,
    getMe,
    userCRUD,
  });
}
