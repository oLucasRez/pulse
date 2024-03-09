import { UnknownError } from '@domain/errors';

import { DatabaseProtocol } from '@data/protocols';

import { makeFirestoreDatabase } from './firestore';

import { makeRealtimeDatabase } from './realtime';

export function makeDatabase(option: makeDatabase.Option): DatabaseProtocol {
  if (option === 'multiple users read/write same data')
    return makeRealtimeDatabase();
  if (option === 'only 1 user read/write each data')
    return makeFirestoreDatabase();

  throw new UnknownError(`Unknown option '${option}'`);
}

export namespace makeDatabase {
  export type Option =
    | 'multiple users read/write same data'
    | 'only 1 user read/write each data';
}

export * from './_table-generator';
