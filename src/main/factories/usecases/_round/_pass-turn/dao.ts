import { PassTurnUsecase } from '@domain/usecases';

import { DAOPassTurnUsecase } from '@data/usecases';

import {
  makeChangeRoundPublisher,
  makeGetRoundUsecase,
  makeRoundDAO,
} from '@main/factories';

export function makeDAOPassTurnUsecase(): PassTurnUsecase {
  const changeRoundPublisher = makeChangeRoundPublisher();
  const getRound = makeGetRoundUsecase();
  const roundDAO = makeRoundDAO();

  return new DAOPassTurnUsecase({
    changeRoundPublisher,
    getRound,
    roundDAO,
  });
}
