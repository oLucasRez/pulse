import { IGetGamesUsecase } from '@domain/usecases';

import { GetGamesUsecase } from '@data/usecases';

import {
  makeGameDAO,
  makeGameHydrator,
  makeGetMeUsecase,
} from '@main/factories';

export function makeGetGamesUsecase(): IGetGamesUsecase {
  const getMe = makeGetMeUsecase();
  const gameDAO = makeGameDAO();
  const gameHydrator = makeGameHydrator();

  return new GetGamesUsecase({
    gameDAO,
    gameHydrator,
    getMe,
  });
}
