import { NotFoundError } from '@domain/errors';
import { UserModel } from '@domain/models';
import { ISignInWithCredentialsUsecase } from '@domain/usecases';

import { IUserDAO } from '@data/dao';
import { UserHydrator } from '@data/hydration';
import { SignInObserver } from '@data/observers';
import { AuthCredentialsProtocol } from '@data/protocols';

export class SignInWithCredentialsUsecase
  implements ISignInWithCredentialsUsecase
{
  private readonly authCredentials: AuthCredentialsProtocol;
  private readonly signInPublisher: SignInObserver.Publisher;
  private readonly userDAO: IUserDAO;

  public constructor({ authCredentials, signInPublisher, userDAO }: Deps) {
    this.authCredentials = authCredentials;
    this.signInPublisher = signInPublisher;
    this.userDAO = userDAO;
  }

  public async execute(
    payload: ISignInWithCredentialsUsecase.Payload,
  ): Promise<UserModel> {
    const { email, password } = payload;

    const uid = await this.authCredentials.signInWithCredentials({
      email,
      password,
    });

    const dto = await this.userDAO.getByUID(uid);

    if (!dto)
      throw new NotFoundError({
        metadata: { entity: 'User', prop: 'uid', value: uid },
      });

    const user = UserHydrator.hydrate(dto);

    this.signInPublisher.notifySignIn(user);

    return user;
  }
}

type Deps = {
  authCredentials: AuthCredentialsProtocol;
  signInPublisher: SignInObserver.Publisher;
  userDAO: IUserDAO;
};
