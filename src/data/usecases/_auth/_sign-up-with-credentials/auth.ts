import { UserModel } from '@domain/models';

import { UserHydrator } from '@data/hydration';

import { SignUpWithCredentialsUsecase } from '@domain/usecases';

import { AuthCredentialsProtocol } from '@data/protocols';

import { AuthObserver } from '@data/observers';

import { UserCRUD } from '@data/cruds';

export class AuthSignUpWithCredentialsUsecase
  implements SignUpWithCredentialsUsecase
{
  private readonly authCredentials: AuthCredentialsProtocol;
  private readonly authPublisher: AuthObserver.Publisher;
  private readonly userCRUD: UserCRUD;

  public constructor(deps: AuthSignUpWithCredentialsUsecase.Deps) {
    this.authCredentials = deps.authCredentials;
    this.authPublisher = deps.authPublisher;
    this.userCRUD = deps.userCRUD;
  }

  public async execute(
    payload: SignUpWithCredentialsUsecase.Payload,
  ): Promise<UserModel> {
    const { name, email, password } = payload;

    const uid = await this.authCredentials.signUpWithCredentials({
      email,
      password,
    });

    const userDTO = await this.userCRUD.create({
      uid,
      name,
      currentGameID: null,
      // useless
      isAnonymous: false,
      providers: [],
    });

    const user = UserHydrator.hydrate(userDTO);

    this.authPublisher.notifySignIn(user);

    return user;
  }
}

export namespace AuthSignUpWithCredentialsUsecase {
  export type Deps = {
    authCredentials: AuthCredentialsProtocol;
    authPublisher: AuthObserver.Publisher;
    userCRUD: UserCRUD;
  };
}
