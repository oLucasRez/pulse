import { UserModel } from '@domain/models';

import { AlreadyExistsError } from '@domain/errors';

import { UserHydrator } from '@data/hydration';

import {
  ChangeMeUsecase,
  LinkWithProviderUsecase,
  SignInWithProviderUsecase,
} from '@domain/usecases';

import { Provider } from '@domain/types';

import {
  AuthProviderProtocol,
  DatabaseProtocol,
  TableGenerator,
} from '@data/protocols';

import { dontThrow } from '@data/utils';

export class AuthLinkWithProviderUsecase implements LinkWithProviderUsecase {
  private readonly changeMe: ChangeMeUsecase;
  private readonly signInWithProvider: SignInWithProviderUsecase;
  private readonly authProvider: AuthProviderProtocol;
  private readonly database: DatabaseProtocol;
  private readonly tableGenerator: TableGenerator;

  public constructor(deps: AuthLinkWithProviderUsecase.Deps) {
    this.changeMe = deps.changeMe;
    this.signInWithProvider = deps.signInWithProvider;
    this.authProvider = deps.authProvider;
    this.database = deps.database;
    this.tableGenerator = deps.tableGenerator;
  }

  public async execute(provider: Provider): Promise<UserModel> {
    let uid: string;
    let name: string | null;
    try {
      const response = await this.authProvider.linkWith(provider);

      uid = response.uid;
      name = response.name;
    } catch (e) {
      if (e instanceof AlreadyExistsError) {
        const response = await this.signInWithProvider.execute(provider);

        uid = response.uid;
        name = response.name;
      } else throw e;
    }

    const table = await this.tableGenerator.getTable();

    let [user] = await this.database.select<UserModel.JSON>(
      table,
      (user) => user.uid === uid,
    );

    if (user) {
      await dontThrow(async () => {
        if (name) await this.changeMe.execute({ name });
      });
    } else {
      user = await this.database.insert<UserModel.JSON>(table, {
        uid,
        name: name ?? '',
        currentGameID: null,
        // useless
        isAnonymous: false,
        providers: [],
      });
    }

    return UserHydrator.hydrate(user);
  }
}

export namespace AuthLinkWithProviderUsecase {
  export type Deps = {
    changeMe: ChangeMeUsecase;
    signInWithProvider: SignInWithProviderUsecase;
    authProvider: AuthProviderProtocol;
    database: DatabaseProtocol;
    tableGenerator: TableGenerator;
  };
}
