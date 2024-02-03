import { DatabaseGetPlayersUsecase } from '@data/usecases';
import { GetPlayersUsecase } from '@domain/usecases';

import {
  makeFirebaseDatabase,
  makePlayersTableGenerator,
} from '@main/factories';

export function makeDatabaseGetPlayersUsecase(): GetPlayersUsecase {
  const database = makeFirebaseDatabase();
  const tableGenerator = makePlayersTableGenerator();

  return new DatabaseGetPlayersUsecase({ database, tableGenerator });
}
