import { SocketProtocol } from '@data/protocols';

import { RealtimeSocket } from '@main/adapters';

export function makeRealtimeSocket(): SocketProtocol {
  return new RealtimeSocket();
}
