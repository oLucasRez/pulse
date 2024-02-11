import { CacheSetCurrentGameUsecase } from '@data/usecases';
import { SetCurrentGameUsecase } from '@domain/usecases';

import {
  makeCache,
  makeChangeUserUsecase,
  makeGetGameUsecase,
} from '@main/factories';

export function makeCacheSetCurrentGameUsecase(): SetCurrentGameUsecase {
  const cache = makeCache();
  const changeUser = makeChangeUserUsecase();
  const getGame = makeGetGameUsecase();

  return new CacheSetCurrentGameUsecase({
    cache,
    changeUser,
    getGame,
  });
}
