import { UserModel } from '@domain/models';

import { SignUpWithPasswordUsecase } from '@domain/usecases';

import {
  AuthPasswordProtocol,
  DatabaseProtocol,
  TableGenerator,
} from '@data/protocols';

export class AuthSignUpWithPasswordUsecase
  implements SignUpWithPasswordUsecase
{
  private readonly authPassword: AuthPasswordProtocol;
  private readonly database: DatabaseProtocol;
  private readonly tableGenerator: TableGenerator;

  public constructor(deps: AuthSignUpWithPasswordUsecase.Deps) {
    this.authPassword = deps.authPassword;
    this.database = deps.database;
    this.tableGenerator = deps.tableGenerator;
  }

  public async execute(
    payload: SignUpWithPasswordUsecase.Payload,
  ): Promise<UserModel> {
    const { name, email, password } = payload;

    const uid = await this.authPassword.signUpWithPassword({
      email,
      password,
    });

    const table = await this.tableGenerator.getTable();
    const user = await this.database.insert<UserModel>(table, {
      uid,
      name,
      currentGameID: null,
    });

    return user;
  }
}

export namespace AuthSignUpWithPasswordUsecase {
  export type Deps = {
    authPassword: AuthPasswordProtocol;
    database: DatabaseProtocol;
    tableGenerator: TableGenerator;
  };
}
