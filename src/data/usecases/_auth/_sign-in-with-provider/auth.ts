import { UserModel } from '@domain/models';

import { UserHydrator } from '@data/hydration';

import { ChangeMeUsecase, SignInWithProviderUsecase } from '@domain/usecases';

import { AuthProviderProtocol } from '@data/protocols';

import { SignInObserver } from '@data/observers';

import { UserCRUD } from '@data/cruds';

import { dontThrow } from '@data/utils';

import { Provider } from '@domain/types';

export class AuthSignInWithProviderUsecase
  implements SignInWithProviderUsecase
{
  private readonly changeMe: ChangeMeUsecase;
  private readonly authProvider: AuthProviderProtocol;
  private readonly signInPublisher: SignInObserver.Publisher;
  private readonly userCRUD: UserCRUD;

  public constructor(deps: AuthSignInWithProviderUsecase.Deps) {
    this.changeMe = deps.changeMe;
    this.authProvider = deps.authProvider;
    this.signInPublisher = deps.signInPublisher;
    this.userCRUD = deps.userCRUD;
  }

  public async execute(provider: Provider): Promise<UserModel> {
    const { uid, name } = await this.authProvider.signInWith(provider);

    let userDTO = await this.userCRUD.read(uid);

    if (userDTO) {
      await dontThrow(async () => {
        if (userDTO && name && name !== userDTO.name)
          await this.changeMe.execute({ name });
      });
    } else {
      userDTO = await this.userCRUD.create({
        uid,
        name: name ?? '',
        currentGameID: null,
        // useless
        isAnonymous: false,
        providers: [],
      });
    }

    const user = UserHydrator.hydrate(userDTO);

    this.signInPublisher.notifySignIn(user);

    return user;
  }
}

export namespace AuthSignInWithProviderUsecase {
  export type Deps = {
    changeMe: ChangeMeUsecase;
    authProvider: AuthProviderProtocol;
    signInPublisher: SignInObserver.Publisher;
    userCRUD: UserCRUD;
  };
}
