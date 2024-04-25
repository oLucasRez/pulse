import { IPassLightSpotRoundTurnUsecase } from '@domain/usecases';

import { PassLightSpotRoundTurnUsecase } from '@data/usecases';

import {
  makeGetLightSpotRoundUsecase,
  makeGetPlayersUsecase,
  makeRoundDAO,
  makeRoundHydrator,
} from '@main/factories';

export function makePassLightSpotRoundTurnUsecase(): IPassLightSpotRoundTurnUsecase {
  const getPlayers = makeGetPlayersUsecase();
  const getLightSpotRound = makeGetLightSpotRoundUsecase();
  const roundDAO = makeRoundDAO();
  const roundHydrator = makeRoundHydrator();

  return new PassLightSpotRoundTurnUsecase({
    getPlayers,
    getLightSpotRound,
    roundDAO,
    roundHydrator,
  });
}
