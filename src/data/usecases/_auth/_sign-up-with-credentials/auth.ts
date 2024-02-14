import { UserModel } from '@domain/models';

import { SignUpWithCredentialsUsecase } from '@domain/usecases';

import {
  AuthCredentialsProtocol,
  DatabaseProtocol,
  TableGenerator,
} from '@data/protocols';

export class AuthSignUpWithCredentialsUsecase
  implements SignUpWithCredentialsUsecase
{
  private readonly authCredentials: AuthCredentialsProtocol;
  private readonly database: DatabaseProtocol;
  private readonly tableGenerator: TableGenerator;

  public constructor(deps: AuthSignUpWithCredentialsUsecase.Deps) {
    this.authCredentials = deps.authCredentials;
    this.database = deps.database;
    this.tableGenerator = deps.tableGenerator;
  }

  public async execute(
    payload: SignUpWithCredentialsUsecase.Payload,
  ): Promise<UserModel> {
    const { name, email, password } = payload;

    const uid = await this.authCredentials.signUpWithCredentials({
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

export namespace AuthSignUpWithCredentialsUsecase {
  export type Deps = {
    authCredentials: AuthCredentialsProtocol;
    database: DatabaseProtocol;
    tableGenerator: TableGenerator;
  };
}
