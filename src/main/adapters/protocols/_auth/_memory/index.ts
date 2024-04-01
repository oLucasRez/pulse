import { faker } from '@faker-js/faker';

import { NotFoundError } from '@domain/errors';
import { UserModel } from '@domain/models';
import { Provider } from '@domain/types';
import { uuid } from '@domain/utils';

import {
  AuthAnonymousProtocol,
  AuthCredentialsProtocol,
  AuthProviderProtocol,
  SessionDestroyerProtocol,
  SessionGetterProtocol,
} from '@data/protocols';

export class MemoryAuth
  implements
    AuthCredentialsProtocol,
    AuthProviderProtocol,
    AuthAnonymousProtocol,
    SessionGetterProtocol,
    SessionDestroyerProtocol
{
  private user: UserModel | null = null;

  public async getSession(): Promise<SessionGetterProtocol.Response> {
    return {
      uid: this.user?.uid || null,
      isAnonymous: this.user?.isAnonymous ?? false,
      providers: [],
    };
  }

  public async signUpWithCredentials(): Promise<string> {
    const user: UserModel = {
      id: uuid(),
      uid: uuid(),
      name: faker.person.fullName(),
      currentGameID: null,
      isAnonymous: false,
      providers: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.user = user;

    return user.uid;
  }

  public async signInWithCredentials(): Promise<string> {
    const user: UserModel = {
      id: uuid(),
      uid: uuid(),
      name: faker.person.fullName(),
      currentGameID: null,
      isAnonymous: false,
      providers: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.user = user;

    return user.uid;
  }

  public async signInWith(): Promise<AuthProviderProtocol.Response> {
    const user: UserModel = {
      id: uuid(),
      uid: uuid(),
      name: faker.person.fullName(),
      currentGameID: null,
      isAnonymous: false,
      providers: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.user = user;

    return { uid: user.uid, name: user.name };
  }

  public async linkWith(
    provider: Provider,
  ): Promise<AuthProviderProtocol.Response> {
    if (!this.user?.providers.includes(provider))
      this.user?.providers.push(provider);

    if (!this.user) throw new NotFoundError({ metadata: { entity: 'User' } });

    return { uid: this.user.uid, name: this.user.name };
  }

  public async signInAnonymously(): Promise<string> {
    const user: UserModel = {
      id: uuid(),
      uid: uuid(),
      name: faker.person.fullName(),
      currentGameID: null,
      isAnonymous: true,
      providers: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.user = user;

    return user.uid;
  }

  public async destroySession(): Promise<void> {
    this.user = null;
  }
}
