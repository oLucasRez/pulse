import { DatabasePassTurnUsecase } from '@data/usecases';
import { PassTurnUsecase } from '@domain/usecases';

import {
  makeDatabase,
  makeGetMeUsecase,
  makeGetRoundUsecase,
  makeRoundsTableGenerator,
} from '@main/factories';

export function makeDatabasePassTurnUsecase(): PassTurnUsecase {
  const database = makeDatabase();
  const getMe = makeGetMeUsecase();
  const getRound = makeGetRoundUsecase();
  const tableGenerator = makeRoundsTableGenerator();

  return new DatabasePassTurnUsecase({
    database,
    getMe,
    getRound,
    tableGenerator,
  });
}
