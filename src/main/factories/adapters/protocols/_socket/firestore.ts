import { SocketProtocol } from '@data/protocols';

import { FirestoreSocket } from '@main/adapters';

export function makeFirestoreSocket(): SocketProtocol {
  return new FirestoreSocket();
}
