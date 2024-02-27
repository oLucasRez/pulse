import { GetGames } from '@data/usecases';
import { GetGamesUsecase } from '@domain/usecases';

import { makeGameCRUD, makeGetMeUsecase } from '@main/factories';

export function makeGetGamesUsecase(): GetGamesUsecase {
  const getMe = makeGetMeUsecase();
  const gameCRUD = makeGameCRUD();

  return new GetGames({ getMe, gameCRUD });
}
