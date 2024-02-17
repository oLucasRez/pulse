import { PlayerModel } from '@domain/models';

import { FailedError, ForbiddenError } from '@domain/errors';

import { GetMeUsecase, GetMyPlayerUsecase } from '@domain/usecases';

import { DatabaseProtocol, TableGenerator } from '@data/protocols';

export class DatabaseGetMyPlayerUsecase implements GetMyPlayerUsecase {
  private readonly getMe: GetMeUsecase;
  private readonly database: DatabaseProtocol;
  private readonly tableGenerator: TableGenerator;

  public constructor(deps: DatabaseGetMyPlayerUsecase.Deps) {
    this.getMe = deps.getMe;
    this.database = deps.database;
    this.tableGenerator = deps.tableGenerator;
  }

  public async execute(): Promise<PlayerModel | null> {
    const me = await this.getMe.execute();
    if (!me) throw new ForbiddenError({ metadata: { tried: 'get my player' } });

    try {
      const table = await this.tableGenerator.getTable();

      const [player] = await this.database.select<PlayerModel>(
        table,
        (player) => player.uid === me.uid,
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
    database: DatabaseProtocol;
    tableGenerator: TableGenerator;
  };
}
