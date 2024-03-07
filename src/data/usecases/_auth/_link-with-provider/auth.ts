import { UserModel } from '@domain/models';

import { AlreadyExistsError } from '@domain/errors';

import { UserHydrator } from '@data/hydration';

import {
  ChangeMeUsecase,
  LinkWithProviderUsecase,
  SignInWithProviderUsecase,
} from '@domain/usecases';

import { Provider } from '@domain/types';

import { AuthProviderProtocol } from '@data/protocols';

import { AuthObserver } from '@data/observers';

import { UserCRUD } from '@data/cruds';

import { dontThrow } from '@data/utils';

export class AuthLinkWithProviderUsecase implements LinkWithProviderUsecase {
  private readonly changeMe: ChangeMeUsecase;
  private readonly signInWithProvider: SignInWithProviderUsecase;
  private readonly authProvider: AuthProviderProtocol;
  private readonly authPublisher: AuthObserver.Publisher;
  private readonly userCRUD: UserCRUD;

  public constructor(deps: AuthLinkWithProviderUsecase.Deps) {
    this.changeMe = deps.changeMe;
    this.signInWithProvider = deps.signInWithProvider;
    this.authProvider = deps.authProvider;
    this.authPublisher = deps.authPublisher;
    this.userCRUD = deps.userCRUD;
  }

  public async execute(provider: Provider): Promise<UserModel> {
    let uid: string;
    let name: string | null;
    try {
      const response = await this.authProvider.linkWith(provider);

      uid = response.uid;
      name = response.name;
    } catch (e) {
      if (e instanceof AlreadyExistsError) {
        const response = await this.signInWithProvider.execute(provider);

        uid = response.uid;
        name = response.name;
      } else throw e;
    }

    let userDTO = await this.userCRUD.read(uid);

    if (userDTO) {
      await dontThrow(async () => {
        if (name) await this.changeMe.execute({ name });
      });
    } else {
      userDTO = await this.userCRUD.update(uid, {
        uid,
        name: name ?? '',
        currentGameID: null,
        // useless
        isAnonymous: false,
        providers: [],
      });
    }

    const user = UserHydrator.hydrate(userDTO);

    this.authPublisher.notifyMeChange(user);

    return user;
  }
}

export namespace AuthLinkWithProviderUsecase {
  export type Deps = {
    changeMe: ChangeMeUsecase;
    signInWithProvider: SignInWithProviderUsecase;
    authProvider: AuthProviderProtocol;
    authPublisher: AuthObserver.Publisher;
    userCRUD: UserCRUD;
  };
}
