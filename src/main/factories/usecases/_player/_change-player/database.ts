import { DatabaseChangePlayerUsecase } from '@data/usecases';
import { ChangePlayerUsecase } from '@domain/usecases';

import {
  makeFirebaseDatabase,
  makePlayersTableGenerator,
} from '@main/factories';

export function makeDatabaseChangePlayerUsecase(): ChangePlayerUsecase {
  const database = makeFirebaseDatabase();
  const tableGenerator = makePlayersTableGenerator();

  return new DatabaseChangePlayerUsecase({ database, tableGenerator });
}
