import { INextGameStateUsecase } from '@domain/usecases';

import { NextGameStateUsecase } from '@data/usecases';

import {
  makeGameDAO,
  makeGameHydrator,
  makeGetCurrentGameUsecase,
  makeGetLightSpotRoundUsecase,
  makePassLightSpotRoundTurnUsecase,
  makePassRoundTurnUsecase,
  makeStartLightSpotRoundUsecase,
  makeStartRoundUsecase,
} from '@main/factories';

export function makeNextGameStateUsecase(): INextGameStateUsecase {
  const gameDAO = makeGameDAO();
  const gameHydrator = makeGameHydrator();
  const getCurrentGame = makeGetCurrentGameUsecase();
  const getLightSpotRound = makeGetLightSpotRoundUsecase();
  const passLightSpotRoundTurn = makePassLightSpotRoundTurnUsecase();
  const passRoundTurn = makePassRoundTurnUsecase();
  const startLightSpotRound = makeStartLightSpotRoundUsecase();
  const startRound = makeStartRoundUsecase();

  return new NextGameStateUsecase({
    gameDAO,
    gameHydrator,
    getCurrentGame,
    getLightSpotRound,
    passLightSpotRoundTurn,
    passRoundTurn,
    startLightSpotRound,
    startRound,
  });
}
