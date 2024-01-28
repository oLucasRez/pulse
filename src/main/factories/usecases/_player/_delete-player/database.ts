import { DatabaseDeletePlayerUsecase } from '@data/usecases';
import { DeletePlayerUsecase } from '@domain/usecases';

import {
  makeDatabaseChangeDiceUsecase,
  makeDatabaseGetPlayerUsecase,
  makeFirebaseDatabase,
  makePlayersTableGenerator,
} from '@main/factories';

export function makeDatabaseDeletePlayerUsecase(): DeletePlayerUsecase {
  const tableGenerator = makePlayersTableGenerator();
  const database = makeFirebaseDatabase();
  const getPlayer = makeDatabaseGetPlayerUsecase();
  const changeDice = makeDatabaseChangeDiceUsecase();

  return new DatabaseDeletePlayerUsecase({
    tableGenerator,
    database,
    getPlayer,
    changeDice,
  });
}
