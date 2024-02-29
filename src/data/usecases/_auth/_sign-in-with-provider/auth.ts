import { UserModel } from '@domain/models';

import { UserHydrator } from '@data/hydration';

import { ChangeMeUsecase, SignInWithProviderUsecase } from '@domain/usecases';

import { Provider } from '@domain/types';

import { AuthProviderProtocol } from '@data/protocols';

import { UserCRUD } from '@data/cruds';

import { dontThrow } from '@data/utils';

export class AuthSignInWithProviderUsecase
  implements SignInWithProviderUsecase
{
  private readonly changeMe: ChangeMeUsecase;
  private readonly authProvider: AuthProviderProtocol;
  private readonly userCRUD: UserCRUD;

  public constructor(deps: AuthSignInWithProviderUsecase.Deps) {
    this.changeMe = deps.changeMe;
    this.authProvider = deps.authProvider;
    this.userCRUD = deps.userCRUD;
  }

  public async execute(provider: Provider): Promise<UserModel> {
    const { uid, name } = await this.authProvider.signInWith(provider);

    let userCRUD = await this.userCRUD.read(uid);

    if (userCRUD) {
      await dontThrow(async () => {
        if (userCRUD && name && name !== userCRUD.name)
          await this.changeMe.execute({ name });
      });
    } else {
      userCRUD = await this.userCRUD.create({
        uid,
        name: name ?? '',
        currentGameID: null,
        // useless
        isAnonymous: false,
        providers: [],
      });
    }

    return UserHydrator.hydrate(userCRUD);
  }
}

export namespace AuthSignInWithProviderUsecase {
  export type Deps = {
    changeMe: ChangeMeUsecase;
    authProvider: AuthProviderProtocol;
    userCRUD: UserCRUD;
  };
}
