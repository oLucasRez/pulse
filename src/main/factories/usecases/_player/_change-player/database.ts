import { DatabaseChangePlayerUsecase } from '@data/usecases';
import { ChangePlayerUsecase } from '@domain/usecases';

import {
  makeFirebaseDatabase,
  makePlayersTableGenerator,
} from '@main/factories';

export function makeDatabaseChangePlayerUsecase(): ChangePlayerUsecase {
  const tableGenerator = makePlayersTableGenerator();
  const database = makeFirebaseDatabase();

  return new DatabaseChangePlayerUsecase({ tableGenerator, database });
}
