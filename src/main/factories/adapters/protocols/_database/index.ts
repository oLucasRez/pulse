import { DatabaseProtocol } from '@data/protocols';

import { makeMemoryDatabase } from './memory';

// import { makeFirebaseDatabase } from './firebase';

export function makeDatabase(): DatabaseProtocol {
  return makeMemoryDatabase();
}

export * from './_table-generator';
