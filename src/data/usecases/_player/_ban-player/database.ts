import { PlayerModel } from '@domain/models';

import { FailedError, ForbiddenError, NotFoundError } from '@domain/errors';

import { PlayerHydrator } from '@data/hydration';

import { BanPlayerUsecase, GetMeUsecase } from '@domain/usecases';

import { DatabaseProtocol, TableGenerator } from '@data/protocols';

export class DatabaseBanPlayerUsecase implements BanPlayerUsecase {
  private readonly getMe: GetMeUsecase;
  private readonly tableGenerator: TableGenerator;
  private readonly database: DatabaseProtocol;

  public constructor(deps: DatabaseBanPlayerUsecase.Deps) {
    this.getMe = deps.getMe;
    this.tableGenerator = deps.tableGenerator;
    this.database = deps.database;
  }

  public async execute(id: string): Promise<void> {
    const me = await this.getMe.execute();
    if (!me)
      throw new ForbiddenError({
        metadata: { tried: 'ban player without session' },
      });

    if (!me.currentGame)
      throw new NotFoundError({ metadata: { entity: 'CurrentGame' } });

    if (me.uid !== me.currentGame.uid)
      throw new ForbiddenError({ metadata: { tried: 'ban player' } });

    try {
      const table = await this.tableGenerator.getTable();

      const player = await this.database.update<PlayerModel.JSON>(table, id, {
        banned: true,
      });

      PlayerHydrator.hydrate(player);
    } catch {
      throw new FailedError({ metadata: { tried: 'ban player' } });
    }
  }
}

export namespace DatabaseBanPlayerUsecase {
  export type Deps = {
    getMe: GetMeUsecase;
    tableGenerator: TableGenerator;
    database: DatabaseProtocol;
  };
}
