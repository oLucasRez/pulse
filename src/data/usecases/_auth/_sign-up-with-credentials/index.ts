import { UserModel } from '@domain/models';
import { ISignUpWithCredentialsUsecase } from '@domain/usecases';

import { IUserDAO } from '@data/dao';
import { IUserHydrator } from '@data/hydration';
import { AuthCredentialsProtocol } from '@data/protocols';

export class SignUpWithCredentialsUsecase
  implements ISignUpWithCredentialsUsecase
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

    const user = await this.userHydrator.hydrate(userDTO);

    return user;
  }
}

type Deps = {
  authCredentials: AuthCredentialsProtocol;
  userDAO: IUserDAO;
  userHydrator: IUserHydrator;
};
