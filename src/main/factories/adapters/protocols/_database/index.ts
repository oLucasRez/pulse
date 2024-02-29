import { DatabaseProtocol } from '@data/protocols';

import { makeFirebaseDatabase } from './firebase';

export function makeDatabase(): DatabaseProtocol {
  return makeFirebaseDatabase();
}

export * from './_table-generator';
