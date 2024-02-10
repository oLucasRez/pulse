import { PlayerModel } from '@domain/models';

import { FailedError, NotFoundError } from '@domain/errors';

import { GetMeUsecase, GetMyPlayerUsecase } from '@domain/usecases';

import { DatabaseProtocol, TableGenerator } from '@data/protocols';

export class DatabaseGetMyPlayerUsecase implements GetMyPlayerUsecase {
  private readonly getMe: GetMeUsecase;
  private readonly tableGenerator: TableGenerator;
  private readonly database: DatabaseProtocol;

  public constructor(deps: DatabaseGetMyPlayerUsecase.Deps) {
    this.getMe = deps.getMe;
    this.tableGenerator = deps.tableGenerator;
    this.database = deps.database;
  }

  public async execute(): Promise<PlayerModel | null> {
    const me = await this.getMe.execute();
    if (!me) throw new NotFoundError({ metadata: { entity: 'User' } });

    try {
      const table = await this.tableGenerator.getTable();

      const [player] = await this.database.select<PlayerModel>(
        table,
        (player) => player.userID === me.id,
      );

      return player || null;
    } catch {
      throw new FailedError({ metadata: { tried: 'get my player' } });
    }
  }
}

export namespace DatabaseGetMyPlayerUsecase {
  export type Deps = {
    getMe: GetMeUsecase;
    tableGenerator: TableGenerator;
    database: DatabaseProtocol;
  };
}
