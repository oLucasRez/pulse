import { UserModel } from '@domain/models';

import { ChangeMeUsecase, SignInWithProviderUsecase } from '@domain/usecases';

import { Provider } from '@domain/types';

import {
  AuthProviderProtocol,
  DatabaseProtocol,
  TableGenerator,
} from '@data/protocols';

import { dontThrow } from '@data/utils';

export class AuthSignInWithProviderUsecase
  implements SignInWithProviderUsecase
{
  private readonly changeMe: ChangeMeUsecase;
  private readonly authProvider: AuthProviderProtocol;
  private readonly database: DatabaseProtocol;
  private readonly tableGenerator: TableGenerator;

  public constructor(deps: AuthSignInWithProviderUsecase.Deps) {
    this.changeMe = deps.changeMe;
    this.authProvider = deps.authProvider;
    this.database = deps.database;
    this.tableGenerator = deps.tableGenerator;
  }

  public async execute(provider: Provider): Promise<UserModel> {
    const { uid, name } = await this.authProvider.signInWith(provider);

    const table = await this.tableGenerator.getTable();

    let [user] = await this.database.select<UserModel>(
      table,
      (user) => user.uid === uid,
    );

    if (user) {
      await dontThrow(async () => {
        if (name && name !== user.name) await this.changeMe.execute({ name });
      });
    } else {
      user = await this.database.insert<UserModel>(table, {
        uid,
        name: name ?? '',
        currentGameID: null,
        // useless
        isAnonymous: false,
        providers: [],
      });
    }

    return user;
  }
}

export namespace AuthSignInWithProviderUsecase {
  export type Deps = {
    changeMe: ChangeMeUsecase;
    authProvider: AuthProviderProtocol;
    database: DatabaseProtocol;
    tableGenerator: TableGenerator;
  };
}
