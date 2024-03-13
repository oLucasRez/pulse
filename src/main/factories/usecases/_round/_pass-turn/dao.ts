import { PassTurnUsecase } from '@domain/usecases';

import { DAOPassTurnUsecase } from '@data/usecases';

import {
  makeChangeRoundPublisher,
  makeGetCurrentGameUsecase,
  makeGetRoundUsecase,
  makeRoundDAO,
} from '@main/factories';

export function makeDAOPassTurnUsecase(): PassTurnUsecase {
  const changeRoundPublisher = makeChangeRoundPublisher();
  const getCurrentGame = makeGetCurrentGameUsecase();
  const getRound = makeGetRoundUsecase();
  const roundDAO = makeRoundDAO();

  return new DAOPassTurnUsecase({
    changeRoundPublisher,
    getCurrentGame,
    getRound,
    roundDAO,
  });
}
