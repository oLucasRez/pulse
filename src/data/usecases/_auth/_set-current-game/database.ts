import { UserModel } from '@domain/models';

import { FailedError, NotFoundError } from '@domain/errors';

import { UserHydrator } from '@data/hydration';

import { GetMeUsecase, SetCurrentGameUsecase } from '@domain/usecases';

import { DatabaseProtocol, TableGenerator } from '@data/protocols';

export class DatabaseSetCurrentGameUsecase implements SetCurrentGameUsecase {
  private readonly getMe: GetMeUsecase;
  private readonly database: DatabaseProtocol;
  private readonly tableGenerator: TableGenerator;

  public constructor(deps: DatabaseSetCurrentGameUsecase.Deps) {
    this.getMe = deps.getMe;
    this.database = deps.database;
    this.tableGenerator = deps.tableGenerator;
  }

  public async execute(gameID: string): Promise<UserModel> {
    const user = await this.getMe.execute();
    if (!user) throw new NotFoundError({ metadata: { entity: 'User' } });

    try {
      const table = await this.tableGenerator.getTable();

      const json = await this.database.update<UserModel.JSON>(table, user.id, {
        currentGameID: gameID,
      });

      return UserHydrator.hydrate(json);
    } catch {
      throw new FailedError({ metadata: { tried: 'change my data' } });
    }
  }
}

export namespace DatabaseSetCurrentGameUsecase {
  export type Deps = {
    getMe: GetMeUsecase;
    database: DatabaseProtocol;
    tableGenerator: TableGenerator;
  };
}
