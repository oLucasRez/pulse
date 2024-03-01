import { DatabaseProtocol } from '@data/protocols';

import { MemoryDatabase } from '@main/adapters';

export function makeMemoryDatabase(): DatabaseProtocol {
  return new MemoryDatabase();
}
