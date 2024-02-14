import { UserModel } from '@domain/models';

import { NotFoundError } from '@domain/errors';

import { SignInWithProviderUsecase } from '@domain/usecases';

import {
  AuthProvider,
  AuthProviderProtocol,
  DatabaseProtocol,
  TableGenerator,
} from '@data/protocols';

export class AuthSignInWithProviderUsecase
  implements SignInWithProviderUsecase
{
  private readonly authProvider: AuthProviderProtocol;
  private readonly database: DatabaseProtocol;
  private readonly tableGenerator: TableGenerator;

  public constructor(deps: AuthSignInWithProviderUsecase.Deps) {
    this.authProvider = deps.authProvider;
    this.database = deps.database;
    this.tableGenerator = deps.tableGenerator;
  }

  public async execute(provider: AuthProvider): Promise<UserModel> {
    const { uid, name, isNewUser } = await this.authProvider.signInWith(
      provider,
    );

    const table = await this.tableGenerator.getTable();

    if (isNewUser) {
      const user = await this.database.insert<UserModel>(table, {
        uid,
        name: name ?? '',
        currentGameID: null,
      });

      return user;
    }

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

export namespace AuthSignInWithProviderUsecase {
  export type Deps = {
    authProvider: AuthProviderProtocol;
    database: DatabaseProtocol;
    tableGenerator: TableGenerator;
  };
}
