import {
  AuthPasswordProtocol,
  SessionDestroyerProtocol,
  SessionGetterProtocol,
} from '@data/protocols';

import {
  makeFirebaseAuthPassword,
  makeFirebaseSessionDestroyer,
  makeFirebaseSessionGetter,
} from './firebase';

export function makeAuthPassword(): AuthPasswordProtocol {
  return makeFirebaseAuthPassword();
}

export function makeSessionDestroyer(): SessionDestroyerProtocol {
  return makeFirebaseSessionDestroyer();
}

export function makeSessionGetter(): SessionGetterProtocol {
  return makeFirebaseSessionGetter();
}
