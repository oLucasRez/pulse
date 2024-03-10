import { NotFoundError } from '@domain/errors';
import { UserModel } from '@domain/models';
import { SignInWithCredentialsUsecase } from '@domain/usecases';

import { UserDAO } from '@data/dao';
import { UserHydrator } from '@data/hydration';
import { SignInObserver } from '@data/observers';
import { AuthCredentialsProtocol } from '@data/protocols';

export class AuthSignInWithCredentialsUsecase
  implements SignInWithCredentialsUsecase
{
  private readonly authCredentials: AuthCredentialsProtocol;
  private readonly signInPublisher: SignInObserver.Publisher;
  private readonly userDAO: UserDAO;

  public constructor(deps: AuthSignInWithCredentialsUsecase.Deps) {
    this.authCredentials = deps.authCredentials;
    this.signInPublisher = deps.signInPublisher;
    this.userDAO = deps.userDAO;
  }

  public async execute(
    payload: SignInWithCredentialsUsecase.Payload,
  ): Promise<UserModel> {
    const { email, password } = payload;

    const uid = await this.authCredentials.signInWithCredentials({
      email,
      password,
    });

    const userDTO = await this.userDAO.read(uid);

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
    userDAO: UserDAO;
  };
}
