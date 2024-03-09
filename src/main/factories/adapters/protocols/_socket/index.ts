import { UnknownError } from '@domain/errors';

import { SocketProtocol } from '@data/protocols';

import { makeFirestoreSocket } from './firestore';

import { makeRealtimeSocket } from './realtime';

export function makeSocket(option: makeSocket.Option): SocketProtocol {
  if (option === 'multiple users listen same data') return makeRealtimeSocket();
  if (option === 'only 1 user listen each data') return makeFirestoreSocket();

  throw new UnknownError(`Unknown option '${option}'`);
}

export namespace makeSocket {
  export type Option =
    | 'multiple users listen same data'
    | 'only 1 user listen each data';
}
