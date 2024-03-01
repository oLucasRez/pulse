import { SocketProtocol } from '@data/protocols';

import { MemoryDatabase } from '../..';

export class MemorySocket implements SocketProtocol {
  public watch<P>(key: string, callback: (snapshot: P) => any): () => void {
    return MemoryDatabase.subscribeDatabaseChanges<P>(key, callback);
  }
}
