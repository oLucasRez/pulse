import { UserModel } from '@domain/models';

import { NotFoundError } from '@domain/errors';

import { UserHydrator } from '@data/hydration';

import { SignInWithCredentialsUsecase } from '@domain/usecases';

import { AuthCredentialsProtocol } from '@data/protocols';

import { SignInObserver } from '@data/observers';

import { UserCRUD } from '@data/cruds';

export class AuthSignInWithCredentialsUsecase
  implements SignInWithCredentialsUsecase
{
  private readonly authCredentials: AuthCredentialsProtocol;
  private readonly signInPublisher: SignInObserver.Publisher;
  private readonly userCRUD: UserCRUD;

  public constructor(deps: AuthSignInWithCredentialsUsecase.Deps) {
    this.authCredentials = deps.authCredentials;
    this.signInPublisher = deps.signInPublisher;
    this.userCRUD = deps.userCRUD;
  }

  public async execute(
    payload: SignInWithCredentialsUsecase.Payload,
  ): Promise<UserModel> {
    const { email, password } = payload;

    const uid = await this.authCredentials.signInWithCredentials({
      email,
      password,
    });

    const userDTO = await this.userCRUD.read(uid);

    if (!userDTO)
      throw new NotFoundError({
        metadata: { entity: 'User', prop: 'uid', value: uid },
      });

    const user = UserHydrator.hydrate(userDTO);

    this.signInPublisher.notifySignIn(user);

    return user;
  }
}

export namespace AuthSignInWithCredentialsUsecase {
  export type Deps = {
    authCredentials: AuthCredentialsProtocol;
    signInPublisher: SignInObserver.Publisher;
    userCRUD: UserCRUD;
  };
}
