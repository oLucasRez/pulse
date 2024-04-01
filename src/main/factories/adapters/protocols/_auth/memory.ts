import {
  AuthAnonymousProtocol,
  AuthCredentialsProtocol,
  AuthProviderProtocol,
  SessionDestroyerProtocol,
  SessionGetterProtocol,
} from '@data/protocols';

import { MemoryAuth } from '@main/adapters';

export function makeMemoryAuthCredentials(): AuthCredentialsProtocol {
  return new MemoryAuth();
}

export function makeMemoryAuthProvider(): AuthProviderProtocol {
  return new MemoryAuth();
}

export function makeMemoryAuthAnonymous(): AuthAnonymousProtocol {
  return new MemoryAuth();
}

export function makeMemorySessionDestroyer(): SessionDestroyerProtocol {
  return new MemoryAuth();
}

export function makeMemorySessionGetter(): SessionGetterProtocol {
  return new MemoryAuth();
}
