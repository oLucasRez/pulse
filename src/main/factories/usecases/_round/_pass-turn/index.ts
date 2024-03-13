import { PassTurnUsecase } from '@domain/usecases';

import { makeDAOPassTurnUsecase } from './dao';

export function makePassTurnUsecase(): PassTurnUsecase {
  return makeDAOPassTurnUsecase();
}
