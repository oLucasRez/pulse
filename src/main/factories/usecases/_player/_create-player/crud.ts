import { CreatePlayerUsecase } from '@domain/usecases';

import { DAOCreatePlayerUsecase } from '@data/usecases';

import {
  makeCreatePlayerPublisher,
  makeGetCurrentGameUsecase,
  makeGetMeUsecase,
  makeGetPlayersUsecase,
  makePlayerDAO,
} from '@main/factories';

export function makeDAOCreatePlayerUsecase(): CreatePlayerUsecase {
  const getCurrentGame = makeGetCurrentGameUsecase();
  const getMe = makeGetMeUsecase();
  const getPlayers = makeGetPlayersUsecase();
  const playerDAO = makePlayerDAO();
  const createPlayerPublisher = makeCreatePlayerPublisher();

  return new DAOCreatePlayerUsecase({
    getCurrentGame,
    getMe,
    getPlayers,
    playerDAO,
    createPlayerPublisher,
  });
}
