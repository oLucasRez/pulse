import { DatabaseGetPlayerUsecase } from '@data/usecases';
import { GetPlayerUsecase } from '@domain/usecases';

import {
  makeFirebaseDatabase,
  makePlayersTableGenerator,
} from '@main/factories';

export function makeDatabaseGetPlayerUsecase(): GetPlayerUsecase {
  const database = makeFirebaseDatabase();
  const tableGenerator = makePlayersTableGenerator();

  return new DatabaseGetPlayerUsecase({ database, tableGenerator });
}
