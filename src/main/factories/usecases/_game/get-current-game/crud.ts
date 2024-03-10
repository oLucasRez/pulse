import { CRUDGetCurrentGameUsecase } from '@data/usecases';
import { GetCurrentGameUsecase } from '@domain/usecases';

import {
  makeFetchCurrentGamePublisher,
  makeGameCRUD,
  makeGetMeUsecase,
} from '@main/factories';

export function makeCRUDGetCurrentGameUsecase(): GetCurrentGameUsecase {
  const gameCRUD = makeGameCRUD();
  const fetchCurrentGamePublisher = makeFetchCurrentGamePublisher();
  const getMe = makeGetMeUsecase();

  return new CRUDGetCurrentGameUsecase({
    gameCRUD,
    fetchCurrentGamePublisher,
    getMe,
  });
}
