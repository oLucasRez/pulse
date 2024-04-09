import { UserModel } from '@domain/models';
import { SignUpWithCredentialsUsecase } from '@domain/usecases';

import { IUserDAO } from '@data/dao';
import { UserHydrator } from '@data/hydration';
import { SignInObserver } from '@data/observers';
import { AuthCredentialsProtocol } from '@data/protocols';

export class AuthSignUpWithCredentialsUsecase
  implements SignUpWithCredentialsUsecase
{
  private readonly authCredentials: AuthCredentialsProtocol;
  private readonly signInPublisher: SignInObserver.Publisher;
  private readonly userDAO: IUserDAO;

  public constructor(deps: AuthSignUpWithCredentialsUsecase.Deps) {
    this.authCredentials = deps.authCredentials;
    this.signInPublisher = deps.signInPublisher;
    this.userDAO = deps.userDAO;
  }

  public async execute(
    payload: SignUpWithCredentialsUsecase.Payload,
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

export namespace AuthSignUpWithCredentialsUsecase {
  export type Deps = {
    authCredentials: AuthCredentialsProtocol;
    signInPublisher: SignInObserver.Publisher;
    userDAO: IUserDAO;
  };
}
