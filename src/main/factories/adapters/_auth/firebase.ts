import { AuthPasswordProtocol, SessionGetterProtocol } from '@data/protocols';

import { FirebaseAuth } from '@main/adapters';

export function makeFirebaseAuthPassword(): AuthPasswordProtocol {
  return new FirebaseAuth();
}

export function makeFirebaseSessionGetter(): SessionGetterProtocol {
  return new FirebaseAuth();
}
