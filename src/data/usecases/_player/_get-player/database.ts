import { PlayerModel } from '@domain/models';

import { NotFoundError } from '@domain/errors';

import { GetPlayerUsecase } from '@domain/usecases';

import { DatabaseProtocol } from '@data/protocols';

export class DatabaseGetPlayerUsecase implements GetPlayerUsecase {
  private readonly table: string;
  private readonly database: DatabaseProtocol;

  public constructor(deps: DatabaseGetPlayerUsecase.Deps) {
    this.table = deps.table;
    this.database = deps.database;
  }

  public async execute(id: string): Promise<PlayerModel> {
    try {
      const [player] = await this.database.select<PlayerModel>(
        this.table,
        (player) => player.id === id,
      );

      if (!player) throw 'error';

      return player;
    } catch {
      throw new NotFoundError({
        metadata: { entity: 'Player', prop: 'id', value: id },
      });
    }
  }
}

export namespace DatabaseGetPlayerUsecase {
  export type Deps = {
    table: string;
    database: DatabaseProtocol;
  };
}
