import { ICreatePlayerUsecase } from '@domain/usecases';

import { CreatePlayerUsecase } from '@data/usecases';

import {
  makeGetCurrentGameUsecase,
  makeGetMeUsecase,
  makeGetPlayersUsecase,
  makePlayerDAO,
  makePlayerHydrator,
} from '@main/factories';

export function makeCreatePlayerUsecase(): ICreatePlayerUsecase {
  const getCurrentGame = makeGetCurrentGameUsecase();
  const getMe = makeGetMeUsecase();
  const getPlayers = makeGetPlayersUsecase();
  const playerDAO = makePlayerDAO();
  const playerHydrator = makePlayerHydrator();

  return new CreatePlayerUsecase({
    getCurrentGame,
    getMe,
    getPlayers,
    playerDAO,
    playerHydrator,
  });
}
