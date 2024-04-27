import { INextGameStateUsecase } from '@domain/usecases';

import { NextGameStateUsecase } from '@data/usecases';

import {
  makeGameDAO,
  makeGameHydrator,
  makeGetCurrentGameUsecase,
  makeGetLightSpotRoundUsecase,
  makeGetRoundUsecase,
  makePassLightSpotRoundTurnUsecase,
  makePassRoundTurnUsecase,
} from '@main/factories';

export function makeNextGameStateUsecase(): INextGameStateUsecase {
  const gameDAO = makeGameDAO();
  const gameHydrator = makeGameHydrator();
  const getCurrentGame = makeGetCurrentGameUsecase();
  const getLightSpotRound = makeGetLightSpotRoundUsecase();
  const getRound = makeGetRoundUsecase();
  const passLightSpotRoundTurn = makePassLightSpotRoundTurnUsecase();
  const passRoundTurn = makePassRoundTurnUsecase();

  return new NextGameStateUsecase({
    gameDAO,
    gameHydrator,
    getCurrentGame,
    getLightSpotRound,
    getRound,
    passLightSpotRoundTurn,
    passRoundTurn,
  });
}
