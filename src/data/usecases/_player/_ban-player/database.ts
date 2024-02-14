import { PlayerModel } from '@domain/models';

import { FailedError, ForbiddenError } from '@domain/errors';

import {
  BanPlayerUsecase,
  GetCurrentGameUsecase,
  GetMeUsecase,
} from '@domain/usecases';

import { DatabaseProtocol, TableGenerator } from '@data/protocols';

export class DatabaseBanPlayerUsecase implements BanPlayerUsecase {
  private readonly getCurrentGame: GetCurrentGameUsecase;
  private readonly getMe: GetMeUsecase;
  private readonly tableGenerator: TableGenerator;
  private readonly database: DatabaseProtocol;

  public constructor(deps: DatabaseBanPlayerUsecase.Deps) {
    this.getCurrentGame = deps.getCurrentGame;
    this.getMe = deps.getMe;
    this.tableGenerator = deps.tableGenerator;
    this.database = deps.database;
  }

  public async execute(id: string): Promise<void> {
    const me = await this.getMe.execute();
    if (!me) throw new ForbiddenError({ metadata: { tried: 'ban player' } });

    const currentGame = await this.getCurrentGame.execute();
    if (!currentGame) return;

    if (me.id !== currentGame.hostID)
      throw new ForbiddenError({ metadata: { tried: 'ban player' } });

    try {
      const table = await this.tableGenerator.getTable();

      await this.database.update<PlayerModel>(table, id, {
        banned: true,
      });
    } catch {
      throw new FailedError({ metadata: { tried: 'ban player' } });
    }
  }
}

export namespace DatabaseBanPlayerUsecase {
  export type Deps = {
    getCurrentGame: GetCurrentGameUsecase;
    getMe: GetMeUsecase;
    tableGenerator: TableGenerator;
    database: DatabaseProtocol;
  };
}
