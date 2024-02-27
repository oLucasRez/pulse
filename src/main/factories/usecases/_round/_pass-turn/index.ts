import { PassTurnUsecase } from '@domain/usecases';

import { makeDatabasePassTurnUsecase } from './database';

export function makePassTurnUsecase(): PassTurnUsecase {
  return makeDatabasePassTurnUsecase();
}
