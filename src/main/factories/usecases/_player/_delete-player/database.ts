import { DatabaseDeletePlayerUsecase } from '@data/usecases';
import { DeletePlayerUsecase } from '@domain/usecases';

import {
  makeChangeDiceUsecase,
  makeFirebaseDatabase,
  makeGetPlayerUsecase,
  makePlayersTableGenerator,
} from '@main/factories';

export function makeDatabaseDeletePlayerUsecase(): DeletePlayerUsecase {
  const changeDice = makeChangeDiceUsecase();
  const database = makeFirebaseDatabase();
  const getPlayer = makeGetPlayerUsecase();
  const tableGenerator = makePlayersTableGenerator();

  return new DatabaseDeletePlayerUsecase({
    changeDice,
    database,
    getPlayer,
    tableGenerator,
  });
}
