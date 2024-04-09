import { UserModel } from '@domain/models';
import { Provider } from '@domain/types';
import { ChangeMeUsecase, SignInWithProviderUsecase } from '@domain/usecases';

import { IUserDAO } from '@data/dao';
import { UserHydrator } from '@data/hydration';
import { SignInObserver } from '@data/observers';
import { AuthProviderProtocol } from '@data/protocols';
import { dontThrow } from '@data/utils';

export class AuthSignInWithProviderUsecase
  implements SignInWithProviderUsecase
{
  private readonly changeMe: ChangeMeUsecase;
  private readonly authProvider: AuthProviderProtocol;
  private readonly signInPublisher: SignInObserver.Publisher;
  private readonly userDAO: IUserDAO;

  public constructor(deps: AuthSignInWithProviderUsecase.Deps) {
    this.changeMe = deps.changeMe;
    this.authProvider = deps.authProvider;
    this.signInPublisher = deps.signInPublisher;
    this.userDAO = deps.userDAO;
  }

  public async execute(provider: Provider): Promise<UserModel> {
    const { uid, name } = await this.authProvider.signInWith(provider);

    let dto = await this.userDAO.getByUID(uid);

    if (dto) {
      await dontThrow(async () => {
        if (dto && name && name !== dto.name)
          await this.changeMe.execute({ name });
      });
    } else {
      dto = await this.userDAO.create({
        uid,
        name: name ?? '',
        currentGameID: null,
        // useless
        isAnonymous: false,
        providers: [],
      });
    }

    const user = UserHydrator.hydrate(dto);

    this.signInPublisher.notifySignIn(user);

    return user;
  }
}

export namespace AuthSignInWithProviderUsecase {
  export type Deps = {
    changeMe: ChangeMeUsecase;
    authProvider: AuthProviderProtocol;
    signInPublisher: SignInObserver.Publisher;
    userDAO: IUserDAO;
  };
}
