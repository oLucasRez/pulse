import { SocketProtocol } from '@data/protocols';

import { FirebaseSocket } from '@main/adapters';

export function makeFirebaseSocket(): SocketProtocol {
  return new FirebaseSocket();
}
