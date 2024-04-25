import { IPassRoundTurnUsecase } from '@domain/usecases';

import { PassRoundTurnUsecase } from '@data/usecases';

import {
  makeGetPlayersUsecase,
  makeGetRoundUsecase,
  makeRoundDAO,
  makeRoundHydrator,
} from '@main/factories';

export function makePassRoundTurnUsecase(): IPassRoundTurnUsecase {
  const getPlayers = makeGetPlayersUsecase();
  const getRound = makeGetRoundUsecase();
  const roundDAO = makeRoundDAO();
  const roundHydrator = makeRoundHydrator();

  return new PassRoundTurnUsecase({
    getPlayers,
    getRound,
    roundDAO,
    roundHydrator,
  });
}
