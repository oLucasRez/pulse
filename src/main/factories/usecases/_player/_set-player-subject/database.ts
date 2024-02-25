import { DatabaseSetPlayerSubjectUsecase } from '@data/usecases';
import { SetPlayerSubjectUsecase } from '@domain/usecases';

import {
  makeDatabase,
  makeGetMyPlayerUsecase,
  makePlayersTableGenerator,
} from '@main/factories';

export function makeDatabaseSetPlayerSubjectUsecase(): SetPlayerSubjectUsecase {
  const database = makeDatabase();
  const getMyPlayer = makeGetMyPlayerUsecase();
  const tableGenerator = makePlayersTableGenerator();

  return new DatabaseSetPlayerSubjectUsecase({
    database,
    getMyPlayer,
    tableGenerator,
  });
}
