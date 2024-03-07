import { SocketProtocol } from '@data/protocols';

// import { makeMemorySocket } from './memory';
import { makeFirebaseSocket } from './firebase';

export function makeSocket(): SocketProtocol {
  return makeFirebaseSocket();
}
