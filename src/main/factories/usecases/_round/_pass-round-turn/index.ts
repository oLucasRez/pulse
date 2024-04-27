import { IPassRoundTurnUsecase } from '@domain/usecases';

import { PassRoundTurnUsecase } from '@data/usecases';

import {
  makeGetCurrentGameUsecase,
  makeGetPlayersUsecase,
  makeGetRoundUsecase,
  makeResetDiceOverloadUsecase,
  makeRoundDAO,
  makeRoundHydrator,
} from '@main/factories';

export function makePassRoundTurnUsecase(): IPassRoundTurnUsecase {
  const getCurrentGame = makeGetCurrentGameUsecase();
  const getPlayers = makeGetPlayersUsecase();
  const getRound = makeGetRoundUsecase();
  const resetDiceOverload = makeResetDiceOverloadUsecase();
  const roundDAO = makeRoundDAO();
  const roundHydrator = makeRoundHydrator();

  return new PassRoundTurnUsecase({
    getCurrentGame,
    getPlayers,
    getRound,
    resetDiceOverload,
    roundDAO,
    roundHydrator,
  });
}
