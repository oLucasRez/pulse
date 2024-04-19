import { AlreadyExistsError } from '@domain/errors';
import { UserModel } from '@domain/models';
import { Provider } from '@domain/types';
import {
  IChangeMeUsecase,
  ILinkWithProviderUsecase,
  ISignInWithProviderUsecase,
} from '@domain/usecases';

import { IUserDAO } from '@data/dao';
import { IUserHydrator } from '@data/hydration';
import { AuthProviderProtocol } from '@data/protocols';
import { dontThrow } from '@data/utils';

export class LinkWithProviderUsecase implements ILinkWithProviderUsecase {
  private readonly changeMe: IChangeMeUsecase;
  private readonly signInWithProvider: ISignInWithProviderUsecase;
  private readonly authProvider: AuthProviderProtocol;
  private readonly userDAO: IUserDAO;
  private readonly userHydrator: IUserHydrator;
  public constructor({
    changeMe,
    signInWithProvider,
    authProvider,
    userDAO,
    userHydrator,
  }: Deps) {
    this.changeMe = changeMe;
    this.signInWithProvider = signInWithProvider;
    this.authProvider = authProvider;
    this.userDAO = userDAO;
    this.userHydrator = userHydrator;
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

    const user = await this.userHydrator.hydrate(dto);

    return user;
  }
}

type Deps = {
  changeMe: IChangeMeUsecase;
  signInWithProvider: ISignInWithProviderUsecase;
  authProvider: AuthProviderProtocol;
  userDAO: IUserDAO;
  userHydrator: IUserHydrator;
};
