import { PlayerModel } from '@domain/models';

import { FailedError } from '@domain/errors';

import { ChangePlayerUsecase } from '@domain/usecases';

import { DatabaseProtocol, TableGenerator } from '@data/protocols';

export class DatabaseChangePlayerUsecase implements ChangePlayerUsecase {
  private readonly tableGenerator: TableGenerator;
  private readonly database: DatabaseProtocol;

  public constructor(deps: DatabaseChangePlayerUsecase.Deps) {
    this.tableGenerator = deps.tableGenerator;
    this.database = deps.database;
  }

  public async execute(
    id: string,
    payload: ChangePlayerUsecase.Payload,
  ): Promise<PlayerModel> {
    const { name, color, avatar } = payload;

    try {
      const table = await this.tableGenerator.getTable();

      const player = await this.database.update<PlayerModel>(table, id, {
        name,
        color,
        avatar,
      });

      return player;
    } catch {
      throw new FailedError({ metadata: { tried: 'change data of player' } });
    }
  }
}

export namespace DatabaseChangePlayerUsecase {
  export type Deps = {
    tableGenerator: TableGenerator;
    database: DatabaseProtocol;
  };
}
