import { UserModel } from '@domain/models';

import { GetCurrentUserUsecase } from '@domain/usecases';

import { DatabaseProtocol, TableGenerator } from '@data/protocols';

export class MockGetCurrentUserUsecase implements GetCurrentUserUsecase {
  private readonly database: DatabaseProtocol;
  private readonly tableGenerator: TableGenerator;

  public constructor(deps: MockGetCurrentUserUsecase.Deps) {
    this.database = deps.database;
    this.tableGenerator = deps.tableGenerator;
  }

  public async execute(): Promise<UserModel | null> {
    const table = await this.tableGenerator.getTable();

    const [user] = await this.database.select<UserModel>(table);

    return user;
  }
}

export namespace MockGetCurrentUserUsecase {
  export type Deps = {
    database: DatabaseProtocol;
    tableGenerator: TableGenerator;
  };
}
