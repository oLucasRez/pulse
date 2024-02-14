import {
  AuthCredentialsProtocol,
  AuthProviderProtocol,
  SessionDestroyerProtocol,
  SessionGetterProtocol,
} from '@data/protocols';

import {
  makeFirebaseAuthCredentials,
  makeFirebaseAuthProvider,
  makeFirebaseSessionDestroyer,
  makeFirebaseSessionGetter,
} from './firebase';

export function makeAuthCredentials(): AuthCredentialsProtocol {
  return makeFirebaseAuthCredentials();
}

export function makeAuthProvider(): AuthProviderProtocol {
  return makeFirebaseAuthProvider();
}

export function makeSessionDestroyer(): SessionDestroyerProtocol {
  return makeFirebaseSessionDestroyer();
}

export function makeSessionGetter(): SessionGetterProtocol {
  return makeFirebaseSessionGetter();
}
