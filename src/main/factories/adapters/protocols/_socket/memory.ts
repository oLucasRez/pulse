import { SocketProtocol } from '@data/protocols';

import { MemorySocket } from '@main/adapters';

export function makeMemorySocket(): SocketProtocol {
  return new MemorySocket();
}
