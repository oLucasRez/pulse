import { ICreateGameUsecase } from '@domain/usecases';

import { CreateGameUsecase } from '@data/usecases';

import {
  makeGameDAO,
  makeGameHydrator,
  makeGetMeUsecase,
} from '@main/factories';

export function makeCreateGameUsecase(): ICreateGameUsecase {
  const gameDAO = makeGameDAO();
  const gameHydrator = makeGameHydrator();
  const getMe = makeGetMeUsecase();

  return new CreateGameUsecase({
    gameDAO,
    gameHydrator,
    getMe,
  });
}
