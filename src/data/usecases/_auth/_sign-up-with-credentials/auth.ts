import { UserModel } from '@domain/models';

import { UserHydrator } from '@data/hydration';

import { SignUpWithCredentialsUsecase } from '@domain/usecases';

import { AuthCredentialsProtocol } from '@data/protocols';

import { UserCRUD } from '@data/cruds';

export class AuthSignUpWithCredentialsUsecase
  implements SignUpWithCredentialsUsecase
{
  private readonly authCredentials: AuthCredentialsProtocol;
  private readonly userCRUD: UserCRUD;

  public constructor(deps: AuthSignUpWithCredentialsUsecase.Deps) {
    this.authCredentials = deps.authCredentials;
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

    return UserHydrator.hydrate(userDTO);
  }
}

export namespace AuthSignUpWithCredentialsUsecase {
  export type Deps = {
    authCredentials: AuthCredentialsProtocol;
    userCRUD: UserCRUD;
  };
}
