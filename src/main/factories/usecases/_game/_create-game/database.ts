import { DatabaseCreateGameUsecase } from '@data/usecases';
import { CreateGameUsecase } from '@domain/usecases';

import {
  makeFirebaseDatabase,
  makeGamesTableGeneratorDecorator,
} from '@main/factories';

export function makeDatabaseCreateGameUsecase(): CreateGameUsecase {
  const tableGenerator = makeGamesTableGeneratorDecorator();
  const database = makeFirebaseDatabase();

  return new DatabaseCreateGameUsecase({ tableGenerator, database });
}
