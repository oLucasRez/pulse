import { DatabaseChangePlayerUsecase } from '@data/usecases';
import { ChangePlayerUsecase } from '@domain/usecases';

import { makeDatabase, makePlayersTableGenerator } from '@main/factories';

export function makeDatabaseChangePlayerUsecase(): ChangePlayerUsecase {
  const database = makeDatabase();
  const tableGenerator = makePlayersTableGenerator();

  return new DatabaseChangePlayerUsecase({ database, tableGenerator });
}
