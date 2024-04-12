import { INextGameStateUsecase } from '@domain/usecases';

import { NextGameStateUsecase } from '@data/usecases';

import {
  makeChangeGamePublisher,
  makeGameDAO,
  makeGetCurrentGameUsecase,
  makePassTurnUsecase,
  makeStartRoundUsecase,
} from '@main/factories';

export function makeNextGameStateUsecase(): INextGameStateUsecase {
  const changeGamePublisher = makeChangeGamePublisher();
  const gameDAO = makeGameDAO();
  const getCurrentGame = makeGetCurrentGameUsecase();
  const passTurn = makePassTurnUsecase();
  const startRound = makeStartRoundUsecase();

  return new NextGameStateUsecase({
    changeGamePublisher,
    gameDAO,
    getCurrentGame,
    passTurn,
    startRound,
  });
}
