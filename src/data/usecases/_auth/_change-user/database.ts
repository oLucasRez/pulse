import { UserModel } from '@domain/models';

import { FailedError, NotFoundError } from '@domain/errors';

import { ChangeUserUsecase, GetCurrentUserUsecase } from '@domain/usecases';

import { DatabaseProtocol, TableGenerator } from '@data/protocols';

export class DatabaseChangeUserUsecase implements ChangeUserUsecase {
  private readonly getCurrentUser: GetCurrentUserUsecase;
  private readonly database: DatabaseProtocol;
  private readonly tableGenerator: TableGenerator;

  public constructor(deps: DatabaseChangeUserUsecase.Deps) {
    this.getCurrentUser = deps.getCurrentUser;
    this.database = deps.database;
    this.tableGenerator = deps.tableGenerator;
  }

  public async execute(payload: ChangeUserUsecase.Payload): Promise<UserModel> {
    const { name, currentGameID } = payload;

    let user = await this.getCurrentUser.execute();
    if (!user) throw new NotFoundError({ metadata: { entity: 'User' } });

    try {
      const table = await this.tableGenerator.getTable();

      user = await this.database.update<UserModel>(table, user.id, {
        name,
        currentGameID,
      });

      return user;
    } catch {
      throw new FailedError({ metadata: { tried: 'change data of user' } });
    }
  }
}

export namespace DatabaseChangeUserUsecase {
  export type Deps = {
    getCurrentUser: GetCurrentUserUsecase;
    database: DatabaseProtocol;
    tableGenerator: TableGenerator;
  };
}
