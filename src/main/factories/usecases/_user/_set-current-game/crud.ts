import { CRUDSetCurrentGameUsecase } from '@data/usecases';
import { SetCurrentGameUsecase } from '@domain/usecases';

import {
  makeChangeMePublisher,
  makeFetchCurrentGamePublisher,
  makeGetGameUsecase,
  makeGetMeUsecase,
  makeUserCRUD,
} from '@main/factories';

export function makeCRUDSetCurrentGameUsecase(): SetCurrentGameUsecase {
  const changeMePublisher = makeChangeMePublisher();
  const fetchCurrentGamePublisher = makeFetchCurrentGamePublisher();
  const getGame = makeGetGameUsecase();
  const getMe = makeGetMeUsecase();
  const userCRUD = makeUserCRUD();

  return new CRUDSetCurrentGameUsecase({
    changeMePublisher,
    fetchCurrentGamePublisher,
    getGame,
    getMe,
    userCRUD,
  });
}
