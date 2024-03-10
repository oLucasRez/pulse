import { CRUDGetMeUsecase } from '@data/usecases';
import { GetMeUsecase } from '@domain/usecases';

import {
  makeFetchMePublisher,
  makeSessionGetter,
  makeUserCRUD,
} from '@main/factories';

export function makeCRUDGetMeUsecase(): GetMeUsecase {
  const fetchMePublisher = makeFetchMePublisher();
  const sessionGetter = makeSessionGetter();
  const userCRUD = makeUserCRUD();

  return new CRUDGetMeUsecase({
    fetchMePublisher,
    sessionGetter,
    userCRUD,
  });
}
