import { PassTurnUsecase } from '@domain/usecases';

import { makeCRUDPassTurnUsecase } from './crud';

export function makePassTurnUsecase(): PassTurnUsecase {
  return makeCRUDPassTurnUsecase();
}
