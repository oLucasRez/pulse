import { AlreadyExistsError } from '@domain/errors';
import { UserModel } from '@domain/models';
import { Provider } from '@domain/types';
import {
  IChangeMeUsecase,
  ILinkWithProviderUsecase,
  ISignInWithProviderUsecase,
} from '@domain/usecases';

import { IUserDAO } from '@data/dao';
import { UserHydrator } from '@data/hydration';
import { ChangeMeObserver } from '@data/observers';
import { AuthProviderProtocol } from '@data/protocols';
import { dontThrow } from '@data/utils';

export class LinkWithProviderUsecase implements ILinkWithProviderUsecase {
  private readonly changeMe: IChangeMeUsecase;
  private readonly signInWithProvider: ISignInWithProviderUsecase;
  private readonly authProvider: AuthProviderProtocol;
  private readonly changeMePublisher: ChangeMeObserver.Publisher;
  private readonly userDAO: IUserDAO;

  public constructor(deps: Deps) {
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

    let dto = await this.userDAO.getByUID(uid);

    if (dto) {
      await dontThrow(async () => {
        if (name) await this.changeMe.execute({ name });
      });
    } else {
      dto = await this.userDAO.update(uid, {
        uid,
        name: name ?? '',
        currentGameID: null,
        // useless
        isAnonymous: false,
        providers: [],
      });
    }

    const user = UserHydrator.hydrate(dto);

    this.changeMePublisher.notifyChangeMe(user);

    return user;
  }
}

type Deps = {
  changeMe: IChangeMeUsecase;
  signInWithProvider: ISignInWithProviderUsecase;
  authProvider: AuthProviderProtocol;
  changeMePublisher: ChangeMeObserver.Publisher;
  userDAO: IUserDAO;
};
