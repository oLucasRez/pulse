import { UserModel } from '@domain/models';

import { UserHydrator } from '@domain/hydration';

import { GetMeUsecase } from '@domain/usecases';

import {
  DatabaseProtocol,
  SessionGetterProtocol,
  TableGenerator,
} from '@data/protocols';

export class AuthGetMeUsecase implements GetMeUsecase {
  private readonly database: DatabaseProtocol;
  private readonly sessionGetter: SessionGetterProtocol;
  private readonly tableGenerator: TableGenerator;

  public constructor(deps: AuthGetMeUsecase.Deps) {
    this.database = deps.database;
    this.sessionGetter = deps.sessionGetter;
    this.tableGenerator = deps.tableGenerator;
  }

  public async execute(): Promise<UserModel | null> {
    const { uid, isAnonymous, providers } =
      await this.sessionGetter.getSession();

    const table = await this.tableGenerator.getTable();
    const [user] = await this.database.select<UserModel.JSON>(
      table,
      (user) => user.uid === uid,
    );

    if (user) {
      user.isAnonymous = isAnonymous;
      user.providers = providers;
    }

    return user ? UserHydrator.hydrate(user) : null;
  }
}

export namespace AuthGetMeUsecase {
  export type Deps = {
    database: DatabaseProtocol;
    sessionGetter: SessionGetterProtocol;
    tableGenerator: TableGenerator;
  };
}
