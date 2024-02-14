import { AuthPasswordProtocol, SessionGetterProtocol } from '@data/protocols';

import {
  makeFirebaseAuthPassword,
  makeFirebaseSessionGetter,
} from './firebase';

export function makeAuthPassword(): AuthPasswordProtocol {
  return makeFirebaseAuthPassword();
}

export function makeSessionGetter(): SessionGetterProtocol {
  return makeFirebaseSessionGetter();
}
