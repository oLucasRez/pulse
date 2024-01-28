import { DatabaseDeleteGameUsecase } from '@data/usecases';
import { DeleteGameUsecase } from '@domain/usecases';

import {
  makeFirebaseDatabase,
  makeGamesTableGeneratorDecorator,
} from '@main/factories';

export function makeDatabaseDeleteGameUsecase(): DeleteGameUsecase {
  const tableGenerator = makeGamesTableGeneratorDecorator();
  const database = makeFirebaseDatabase();

  return new DatabaseDeleteGameUsecase({ tableGenerator, database });
}
