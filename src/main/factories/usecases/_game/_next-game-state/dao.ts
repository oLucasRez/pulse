import { NextGameStateUsecase } from '@domain/usecases';

import { DAONextGameStateUsecase } from '@data/usecases';

import {
  makeChangeGamePublisher,
  makeGameDAO,
  makeGetCurrentGameUsecase,
  makePassTurnUsecase,
  makeStartRoundUsecase,
} from '@main/factories';

export function makeDAONextGameStateUsecase(): NextGameStateUsecase {
  const changeGamePublisher = makeChangeGamePublisher();
  const gameDAO = makeGameDAO();
  const getCurrentGame = makeGetCurrentGameUsecase();
  const passTurn = makePassTurnUsecase();
  const startRound = makeStartRoundUsecase();

  return new DAONextGameStateUsecase({
    changeGamePublisher,
    gameDAO,
    getCurrentGame,
    passTurn,
    startRound,
  });
}
