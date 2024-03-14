import { NextGameStateUsecase } from '@domain/usecases';

import { DAONextGameStateUsecase } from '@data/usecases';

import {
  makeChangeGamePublisher,
  makeGameDAO,
  makeGetCurrentGameUsecase,
  makeStartRoundUsecase,
} from '@main/factories';

export function makeDAONextGameStateUsecase(): NextGameStateUsecase {
  const changeGamePublisher = makeChangeGamePublisher();
  const gameDAO = makeGameDAO();
  const getCurrentGame = makeGetCurrentGameUsecase();
  const startRound = makeStartRoundUsecase();

  return new DAONextGameStateUsecase({
    changeGamePublisher,
    gameDAO,
    getCurrentGame,
    startRound,
  });
}
