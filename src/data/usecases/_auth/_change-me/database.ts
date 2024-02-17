import { UserModel } from '@domain/models';

import { FailedError, NotFoundError } from '@domain/errors';

import { ChangeMeUsecase, GetMeUsecase } from '@domain/usecases';

import { DatabaseProtocol, TableGenerator } from '@data/protocols';

export class DatabaseChangeMeUsecase implements ChangeMeUsecase {
  private readonly getMe: GetMeUsecase;
  private readonly database: DatabaseProtocol;
  private readonly tableGenerator: TableGenerator;

  public constructor(deps: DatabaseChangeMeUsecase.Deps) {
    this.getMe = deps.getMe;
    this.database = deps.database;
    this.tableGenerator = deps.tableGenerator;
  }

  public async execute(payload: ChangeMeUsecase.Payload): Promise<UserModel> {
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
      throw new FailedError({ metadata: { tried: 'change my data' } });
    }
  }
}

export namespace DatabaseChangeMeUsecase {
  export type Deps = {
    getMe: GetMeUsecase;
    database: DatabaseProtocol;
    tableGenerator: TableGenerator;
  };
}
