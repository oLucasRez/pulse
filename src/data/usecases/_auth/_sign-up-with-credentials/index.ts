import { UserModel } from '@domain/models';
import { ISignUpWithCredentialsUsecase } from '@domain/usecases';

import { IUserDAO } from '@data/dao';
import { UserHydrator } from '@data/hydration';
import { SignInObserver } from '@data/observers';
import { AuthCredentialsProtocol } from '@data/protocols';

export class SignUpWithCredentialsUsecase
  implements ISignUpWithCredentialsUsecase
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
    payload: ISignUpWithCredentialsUsecase.Payload,
  ): Promise<UserModel> {
    const { name, email, password } = payload;

    const uid = await this.authCredentials.signUpWithCredentials({
      email,
      password,
    });

    const userDTO = await this.userDAO.create({
      uid,
      name,
      currentGameID: null,
      // useless
      isAnonymous: false,
      providers: [],
    });

    const user = UserHydrator.hydrate(userDTO);

    this.signInPublisher.notifySignIn(user);

    return user;
  }
}

type Deps = {
  authCredentials: AuthCredentialsProtocol;
  signInPublisher: SignInObserver.Publisher;
  userDAO: IUserDAO;
};
