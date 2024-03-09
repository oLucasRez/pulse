import { DatabaseProtocol } from '@data/protocols';

import { FirestoreDatabase } from '@main/adapters';

export function makeFirestoreDatabase(): DatabaseProtocol {
  return new FirestoreDatabase();
}
