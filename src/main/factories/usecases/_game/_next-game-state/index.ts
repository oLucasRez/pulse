import { INextGameStateUsecase } from '@domain/usecases';

import { NextGameStateUsecase } from '@data/usecases';

import {
  makeGameDAO,
  makeGameHydrator,
  makeGetCurrentGameUsecase,
  makeGetRoundUsecase,
  makePassTurnUsecase,
  makeStartRoundUsecase,
} from '@main/factories';

export function makeNextGameStateUsecase(): INextGameStateUsecase {
  const gameDAO = makeGameDAO();
  const gameHydrator = makeGameHydrator();
  const getCurrentGame = makeGetCurrentGameUsecase();
  const getRound = makeGetRoundUsecase();
  const passTurn = makePassTurnUsecase();
  const startRound = makeStartRoundUsecase();

  return new NextGameStateUsecase({
    gameDAO,
    gameHydrator,
    getCurrentGame,
    getRound,
    passTurn,
    startRound,
  });
}
