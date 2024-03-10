import { PassTurnUsecase } from '@domain/usecases';

import { DAOPassTurnUsecase } from '@data/usecases';

import {
  makeGetCurrentGameUsecase,
  makeGetRoundUsecase,
  makeRoundDAO,
} from '@main/factories';

export function makeDAOPassTurnUsecase(): PassTurnUsecase {
  const getCurrentGame = makeGetCurrentGameUsecase();
  const getRound = makeGetRoundUsecase();
  const roundDAO = makeRoundDAO();

  return new DAOPassTurnUsecase({ getCurrentGame, getRound, roundDAO });
}
