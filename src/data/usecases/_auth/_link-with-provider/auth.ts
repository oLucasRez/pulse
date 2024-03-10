import { AlreadyExistsError } from '@domain/errors';
import { UserModel } from '@domain/models';
import { Provider } from '@domain/types';
import {
  ChangeMeUsecase,
  LinkWithProviderUsecase,
  SignInWithProviderUsecase,
} from '@domain/usecases';

import { UserDAO } from '@data/dao';
import { UserHydrator } from '@data/hydration';
import { ChangeMeObserver } from '@data/observers';
import { AuthProviderProtocol } from '@data/protocols';
import { dontThrow } from '@data/utils';

export class AuthLinkWithProviderUsecase implements LinkWithProviderUsecase {
  private readonly changeMe: ChangeMeUsecase;
  private readonly signInWithProvider: SignInWithProviderUsecase;
  private readonly authProvider: AuthProviderProtocol;
  private readonly changeMePublisher: ChangeMeObserver.Publisher;
  private readonly userDAO: UserDAO;

  public constructor(deps: AuthLinkWithProviderUsecase.Deps) {
    this.changeMe = deps.changeMe;
    this.signInWithProvider = deps.signInWithProvider;
    this.authProvider = deps.authProvider;
    this.changeMePublisher = deps.changeMePublisher;
    this.userDAO = deps.userDAO;
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

    let userDTO = await this.userDAO.read(uid);

    if (userDTO) {
      await dontThrow(async () => {
        if (name) await this.changeMe.execute({ name });
      });
    } else {
      userDTO = await this.userDAO.update(uid, {
        uid,
        name: name ?? '',
        currentGameID: null,
        // useless
        isAnonymous: false,
        providers: [],
      });
    }

    const user = UserHydrator.hydrate(userDTO);

    this.changeMePublisher.notifyChangeMe(user);

    return user;
  }
}

export namespace AuthLinkWithProviderUsecase {
  export type Deps = {
    changeMe: ChangeMeUsecase;
    signInWithProvider: SignInWithProviderUsecase;
    authProvider: AuthProviderProtocol;
    changeMePublisher: ChangeMeObserver.Publisher;
    userDAO: UserDAO;
  };
}
