import { CRUDPassTurnUsecase } from '@data/usecases';
import { PassTurnUsecase } from '@domain/usecases';

import {
  makeGetCurrentGameUsecase,
  makeGetRoundUsecase,
  makeRoundCRUD,
} from '@main/factories';

export function makeCRUDPassTurnUsecase(): PassTurnUsecase {
  const getCurrentGame = makeGetCurrentGameUsecase();
  const getRound = makeGetRoundUsecase();
  const roundCRUD = makeRoundCRUD();

  return new CRUDPassTurnUsecase({ getCurrentGame, getRound, roundCRUD });
}
