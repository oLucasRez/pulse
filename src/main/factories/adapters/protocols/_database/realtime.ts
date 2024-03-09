import { DatabaseProtocol } from '@data/protocols';

import { RealtimeDatabase } from '@main/adapters';

export function makeRealtimeDatabase(): DatabaseProtocol {
  return new RealtimeDatabase();
}
