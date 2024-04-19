import { IPassTurnUsecase } from '@domain/usecases';

import { PassTurnUsecase } from '@data/usecases';

import {
  makeGetRoundUsecase,
  makeRoundDAO,
  makeRoundHydrator,
} from '@main/factories';

export function makePassTurnUsecase(): IPassTurnUsecase {
  const getRound = makeGetRoundUsecase();
  const roundDAO = makeRoundDAO();
  const roundHydrator = makeRoundHydrator();

  return new PassTurnUsecase({
    getRound,
    roundDAO,
    roundHydrator,
  });
}
