import {
  AuthCredentialsProtocol,
  SessionDestroyerProtocol,
  SessionGetterProtocol,
} from '@data/protocols';

import {
  makeFirebaseAuthCredentials,
  makeFirebaseSessionDestroyer,
  makeFirebaseSessionGetter,
} from './firebase';

export function makeAuthCredentials(): AuthCredentialsProtocol {
  return makeFirebaseAuthCredentials();
}

export function makeSessionDestroyer(): SessionDestroyerProtocol {
  return makeFirebaseSessionDestroyer();
}

export function makeSessionGetter(): SessionGetterProtocol {
  return makeFirebaseSessionGetter();
}
