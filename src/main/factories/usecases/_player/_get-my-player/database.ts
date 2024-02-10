import { DatabaseGetMyPlayerUsecase } from '@data/usecases';
import { GetMyPlayerUsecase } from '@domain/usecases';

import {
  makeDatabase,
  makeGetMeUsecase,
  makePlayersTableGenerator,
} from '@main/factories';

export function makeDatabaseGetMyPlayerUsecase(): GetMyPlayerUsecase {
  const database = makeDatabase();
  const getMe = makeGetMeUsecase();
  const tableGenerator = makePlayersTableGenerator();

  return new DatabaseGetMyPlayerUsecase({ database, getMe, tableGenerator });
}
