import { ISetCurrentGameUsecase } from '@domain/usecases';

import { SetCurrentGameUsecase } from '@data/usecases';

import {
  makeGetGameUsecase,
  makeGetMeUsecase,
  makeUserDAO,
  makeUserHydrator,
} from '@main/factories';

export function makeSetCurrentGameUsecase(): ISetCurrentGameUsecase {
  const getGame = makeGetGameUsecase();
  const getMe = makeGetMeUsecase();
  const userDAO = makeUserDAO();
  const userHydrator = makeUserHydrator();

  return new SetCurrentGameUsecase({
    getGame,
    getMe,
    userDAO,
    userHydrator,
  });
}
