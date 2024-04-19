import { IWatchGamesUsecase } from '@domain/usecases';

import { WatchGamesUsecase } from '@data/usecases';

import {
  makeGameDAO,
  makeGameHydrator,
  makeGetMeUsecase,
} from '@main/factories';

export function makeWatchGamesUsecase(): IWatchGamesUsecase {
  const gameDAO = makeGameDAO();
  const gameHydrator = makeGameHydrator();
  const getMe = makeGetMeUsecase();

  return new WatchGamesUsecase({
    gameDAO,
    gameHydrator,
    getMe,
  });
}
