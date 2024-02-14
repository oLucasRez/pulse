import {
  AuthCredentialsProtocol,
  SessionDestroyerProtocol,
  SessionGetterProtocol,
} from '@data/protocols';

import { FirebaseAuth } from '@main/adapters';

export function makeFirebaseAuthCredentials(): AuthCredentialsProtocol {
  return new FirebaseAuth();
}

export function makeFirebaseSessionDestroyer(): SessionDestroyerProtocol {
  return new FirebaseAuth();
}

export function makeFirebaseSessionGetter(): SessionGetterProtocol {
  return new FirebaseAuth();
}
