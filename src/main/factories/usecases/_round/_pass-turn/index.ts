import { PassTurnUsecase } from '@domain/usecases';

import { makeDAOPassTurnUsecase } from './crud';

export function makePassTurnUsecase(): PassTurnUsecase {
  return makeDAOPassTurnUsecase();
}
