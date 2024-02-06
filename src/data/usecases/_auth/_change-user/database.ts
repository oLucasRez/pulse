import { UserModel } from '@domain/models';

import { FailedError, NotFoundError } from '@domain/errors';

import { ChangeUserUsecase, GetMeUsecase } from '@domain/usecases';

import { DatabaseProtocol, TableGenerator } from '@data/protocols';

export class DatabaseChangeUserUsecase implements ChangeUserUsecase {
  private readonly getMe: GetMeUsecase;
  private readonly database: DatabaseProtocol;
  private readonly tableGenerator: TableGenerator;

  public constructor(deps: DatabaseChangeUserUsecase.Deps) {
    this.getMe = deps.getMe;
    this.database = deps.database;
    this.tableGenerator = deps.tableGenerator;
  }

  public async execute(payload: ChangeUserUsecase.Payload): Promise<UserModel> {
    const { name, currentGameID } = payload;

    let user = await this.getMe.execute();
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
    getMe: GetMeUsecase;
    database: DatabaseProtocol;
    tableGenerator: TableGenerator;
  };
}
