import { CacheSetCurrentGameUsecase } from '@data/usecases';
import { SetCurrentGameUsecase } from '@domain/usecases';

import { makeChangeMeUsecase, makeGetGameUsecase } from '@main/factories';

export function makeCacheSetCurrentGameUsecase(): SetCurrentGameUsecase {
  const changeMe = makeChangeMeUsecase();
  const getGame = makeGetGameUsecase();

  return new CacheSetCurrentGameUsecase({
    changeMe,
    getGame,
  });
}
