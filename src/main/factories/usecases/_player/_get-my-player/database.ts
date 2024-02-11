import { DatabaseGetMyPlayerUsecase } from '@data/usecases';
import { GetMyPlayerUsecase } from '@domain/usecases';

import {
  makeCache,
  makeDatabase,
  makeGetMeUsecase,
  makeGetPlayerUsecase,
  makePlayersTableGenerator,
} from '@main/factories';

export function makeDatabaseGetMyPlayerUsecase(): GetMyPlayerUsecase {
  const cache = makeCache();
  const database = makeDatabase();
  const getMe = makeGetMeUsecase();
  const getPlayer = makeGetPlayerUsecase();
  const tableGenerator = makePlayersTableGenerator();

  return new DatabaseGetMyPlayerUsecase({
    cache,
    database,
    getMe,
    getPlayer,
    tableGenerator,
  });
}
