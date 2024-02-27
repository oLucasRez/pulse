import { CacheProtocol } from '@data/protocols';

import { makeLocalStorageCache } from './local-storage';

export function makeCache(): CacheProtocol {
  return makeLocalStorageCache();
}
