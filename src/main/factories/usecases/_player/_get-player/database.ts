import { DatabaseGetPlayerUsecase } from '@data/usecases';
import { GetPlayerUsecase } from '@domain/usecases';

import {
  makeFirebaseDatabase,
  makePlayersTableGenerator,
} from '@main/factories';

export function makeDatabaseGetPlayerUsecase(): GetPlayerUsecase {
  const tableGenerator = makePlayersTableGenerator();
  const database = makeFirebaseDatabase();

  return new DatabaseGetPlayerUsecase({ tableGenerator, database });
}
