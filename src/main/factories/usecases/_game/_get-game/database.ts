import { DatabaseGetGameUsecase } from '@data/usecases';
import { GetGameUsecase } from '@domain/usecases';

import {
  makeFirebaseDatabase,
  makeGamesTableGeneratorDecorator,
} from '@main/factories';

export function makeDatabaseGetGameUsecase(): GetGameUsecase {
  const tableGenerator = makeGamesTableGeneratorDecorator();
  const database = makeFirebaseDatabase();

  return new DatabaseGetGameUsecase({ tableGenerator, database });
}
