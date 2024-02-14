import { UserModel } from '@domain/models';

import { NotFoundError } from '@domain/errors';

import { SignInWithCredentialsUsecase } from '@domain/usecases';

import {
  AuthCredentialsProtocol,
  DatabaseProtocol,
  TableGenerator,
} from '@data/protocols';

export class AuthSignInWithCredentialsUsecase
  implements SignInWithCredentialsUsecase
{
  private readonly authCredentials: AuthCredentialsProtocol;
  private readonly database: DatabaseProtocol;
  private readonly tableGenerator: TableGenerator;

  public constructor(deps: AuthSignInWithCredentialsUsecase.Deps) {
    this.authCredentials = deps.authCredentials;
    this.database = deps.database;
    this.tableGenerator = deps.tableGenerator;
  }

  public async execute(
    payload: SignInWithCredentialsUsecase.Payload,
  ): Promise<UserModel> {
    const { email, password } = payload;

    const uid = await this.authCredentials.signInWithCredentials({
      email,
      password,
    });

    const table = await this.tableGenerator.getTable();
    const [user] = await this.database.select<UserModel>(
      table,
      (user) => user.uid === uid,
    );

    if (!user)
      throw new NotFoundError({
        metadata: { entity: 'User', prop: 'uid', value: uid },
      });

    return user;
  }
}

export namespace AuthSignInWithCredentialsUsecase {
  export type Deps = {
    authCredentials: AuthCredentialsProtocol;
    database: DatabaseProtocol;
    tableGenerator: TableGenerator;
  };
}
