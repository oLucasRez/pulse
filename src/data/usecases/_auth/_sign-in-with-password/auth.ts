import { UserModel } from '@domain/models';

import { NotFoundError } from '@domain/errors';

import { SignInWithPasswordUsecase } from '@domain/usecases';

import {
  AuthPasswordProtocol,
  DatabaseProtocol,
  TableGenerator,
} from '@data/protocols';

export class AuthSignInWithPasswordUsecase
  implements SignInWithPasswordUsecase
{
  private readonly authPassword: AuthPasswordProtocol;
  private readonly database: DatabaseProtocol;
  private readonly tableGenerator: TableGenerator;

  public constructor(deps: AuthSignInWithPasswordUsecase.Deps) {
    this.authPassword = deps.authPassword;
    this.database = deps.database;
    this.tableGenerator = deps.tableGenerator;
  }

  public async execute(
    payload: SignInWithPasswordUsecase.Payload,
  ): Promise<UserModel> {
    const { email, password } = payload;

    const uid = await this.authPassword.signInWithPassword({
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

export namespace AuthSignInWithPasswordUsecase {
  export type Deps = {
    authPassword: AuthPasswordProtocol;
    database: DatabaseProtocol;
    tableGenerator: TableGenerator;
  };
}
