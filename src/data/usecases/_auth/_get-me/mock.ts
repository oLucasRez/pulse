import { UserModel } from '@domain/models';

import { GetMeUsecase } from '@domain/usecases';

import { DatabaseProtocol, TableGenerator } from '@data/protocols';

export class MockGetMeUsecase implements GetMeUsecase {
  private readonly database: DatabaseProtocol;
  private readonly tableGenerator: TableGenerator;

  public constructor(deps: MockGetMeUsecase.Deps) {
    this.database = deps.database;
    this.tableGenerator = deps.tableGenerator;
  }

  public async execute(): Promise<UserModel | null> {
    const table = await this.tableGenerator.getTable();

    const [me] = await this.database.select<UserModel>(
      table,
      (user) => user.id === localStorage.getItem('session'),
    );

    return me || null;
  }
}

export namespace MockGetMeUsecase {
  export type Deps = {
    database: DatabaseProtocol;
    tableGenerator: TableGenerator;
  };
}
