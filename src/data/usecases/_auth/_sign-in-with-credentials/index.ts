import { NotFoundError } from '@domain/errors';
import { UserModel } from '@domain/models';
import { ISignInWithCredentialsUsecase } from '@domain/usecases';

import { IUserDAO } from '@data/dao';
import { IUserHydrator } from '@data/hydration';
import { AuthCredentialsProtocol } from '@data/protocols';

export class SignInWithCredentialsUsecase
  implements ISignInWithCredentialsUsecase
{
  private readonly authCredentials: AuthCredentialsProtocol;
  private readonly userDAO: IUserDAO;
  private readonly userHydrator: IUserHydrator;
  public constructor({ authCredentials, userDAO, userHydrator }: Deps) {
    this.authCredentials = authCredentials;
    this.userDAO = userDAO;
    this.userHydrator = userHydrator;
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

    const user = await this.userHydrator.hydrate(dto);

    return user;
  }
}

type Deps = {
  authCredentials: AuthCredentialsProtocol;
  userDAO: IUserDAO;
  userHydrator: IUserHydrator;
};
