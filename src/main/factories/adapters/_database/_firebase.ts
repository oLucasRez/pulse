import { DatabaseProtocol } from '@data/protocols';

import { FirebaseDatabase } from '@main/adapters';

export function makeFirebaseDatabase(): DatabaseProtocol {
  return new FirebaseDatabase();
}
