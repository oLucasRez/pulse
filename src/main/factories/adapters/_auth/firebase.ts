import {
  AuthCredentialsProtocol,
  AuthProviderProtocol,
  SessionDestroyerProtocol,
  SessionGetterProtocol,
} from '@data/protocols';

import { FirebaseAuth } from '@main/adapters';

export function makeFirebaseAuthCredentials(): AuthCredentialsProtocol {
  return new FirebaseAuth();
}

export function makeFirebaseAuthProvider(): AuthProviderProtocol {
  return new FirebaseAuth();
}

export function makeFirebaseSessionDestroyer(): SessionDestroyerProtocol {
  return new FirebaseAuth();
}

export function makeFirebaseSessionGetter(): SessionGetterProtocol {
  return new FirebaseAuth();
}
