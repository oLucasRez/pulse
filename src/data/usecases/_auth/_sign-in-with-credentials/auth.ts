import { UserModel } from '@domain/models';

import { NotFoundError } from '@domain/errors';

import { UserHydrator } from '@data/hydration';

import { SignInWithCredentialsUsecase } from '@domain/usecases';

import { AuthCredentialsProtocol } from '@data/protocols';

import { UserCRUD } from '@data/cruds';

export class AuthSignInWithCredentialsUsecase
  implements SignInWithCredentialsUsecase
{
  private readonly authCredentials: AuthCredentialsProtocol;
  private readonly userCRUD: UserCRUD;

  public constructor(deps: AuthSignInWithCredentialsUsecase.Deps) {
    this.authCredentials = deps.authCredentials;
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

    return UserHydrator.hydrate(userDTO);
  }
}

export namespace AuthSignInWithCredentialsUsecase {
  export type Deps = {
    authCredentials: AuthCredentialsProtocol;
    userCRUD: UserCRUD;
  };
}
