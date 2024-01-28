import { DatabaseGetPlayersUsecase } from '@data/usecases';
import { GetPlayersUsecase } from '@domain/usecases';

import {
  makeFirebaseDatabase,
  makePlayersTableGenerator,
} from '@main/factories';

export function makeDatabaseGetPlayersUsecase(): GetPlayersUsecase {
  const tableGenerator = makePlayersTableGenerator();
  const database = makeFirebaseDatabase();

  return new DatabaseGetPlayersUsecase({ tableGenerator, database });
}
