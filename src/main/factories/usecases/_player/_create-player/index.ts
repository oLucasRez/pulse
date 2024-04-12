import { ICreatePlayerUsecase } from '@domain/usecases';

import { CreatePlayerUsecase } from '@data/usecases';

import {
  makeCreatePlayerPublisher,
  makeGetCurrentGameUsecase,
  makeGetMeUsecase,
  makeGetPlayersUsecase,
  makePlayerDAO,
} from '@main/factories';

export function makeCreatePlayerUsecase(): ICreatePlayerUsecase {
  const getCurrentGame = makeGetCurrentGameUsecase();
  const getMe = makeGetMeUsecase();
  const getPlayers = makeGetPlayersUsecase();
  const playerDAO = makePlayerDAO();
  const createPlayerPublisher = makeCreatePlayerPublisher();

  return new CreatePlayerUsecase({
    getCurrentGame,
    getMe,
    getPlayers,
    playerDAO,
    createPlayerPublisher,
  });
}
