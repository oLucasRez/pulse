import { CacheProtocol } from '@data/protocols';

import { LocalStorageCache } from '@main/adapters';

export function makeLocalStorageCache(): CacheProtocol {
  return new LocalStorageCache();
}
