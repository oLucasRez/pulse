import { UserModel } from '@domain/models';

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
    const uid = await this.sessionGetter.getSession();

    const table = await this.tableGenerator.getTable();
    const [user] = await this.database.select<UserModel>(
      table,
      (user) => user.uid === uid,
    );

    return user;
  }
}

export namespace AuthGetMeUsecase {
  export type Deps = {
    database: DatabaseProtocol;
    sessionGetter: SessionGetterProtocol;
    tableGenerator: TableGenerator;
  };
}
