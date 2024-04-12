import { IPassTurnUsecase } from '@domain/usecases';

import { PassTurnUsecase } from '@data/usecases';

import {
  makeChangeRoundPublisher,
  makeGetRoundUsecase,
  makeRoundDAO,
} from '@main/factories';

export function makePassTurnUsecase(): IPassTurnUsecase {
  const changeRoundPublisher = makeChangeRoundPublisher();
  const getRound = makeGetRoundUsecase();
  const roundDAO = makeRoundDAO();

  return new PassTurnUsecase({
    changeRoundPublisher,
    getRound,
    roundDAO,
  });
}
