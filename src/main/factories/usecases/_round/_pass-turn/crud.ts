import { CRUDPassTurnUsecase } from '@data/usecases';
import { PassTurnUsecase } from '@domain/usecases';

import {
  makeGetMeUsecase,
  makeGetRoundUsecase,
  makeRoundCRUD,
} from '@main/factories';

export function makeCRUDPassTurnUsecase(): PassTurnUsecase {
  const getMe = makeGetMeUsecase();
  const getRound = makeGetRoundUsecase();
  const roundCRUD = makeRoundCRUD();

  return new CRUDPassTurnUsecase({
    getMe,
    getRound,
    roundCRUD,
  });
}
