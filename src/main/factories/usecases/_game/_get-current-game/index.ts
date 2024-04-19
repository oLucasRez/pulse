import { IGetCurrentGameUsecase } from '@domain/usecases';

import { GetCurrentGameUsecase } from '@data/usecases';

import {
  makeGameDAO,
  makeGameHydrator,
  makeGetMeUsecase,
} from '@main/factories';

export function makeGetCurrentGameUsecase(): IGetCurrentGameUsecase {
  const gameDAO = makeGameDAO();
  const gameHydrator = makeGameHydrator();
  const getMe = makeGetMeUsecase();

  return new GetCurrentGameUsecase({
    gameDAO,
    gameHydrator,
    getMe,
  });
}
