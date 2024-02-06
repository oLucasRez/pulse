import { SocketProtocol } from '@data/protocols';

import { makeFirebaseSocket } from './firebase';

export function makeSocket(): SocketProtocol {
  return makeFirebaseSocket();
}
