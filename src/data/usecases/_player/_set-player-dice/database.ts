import { PlayerModel } from '@domain/models';

import { FailedError } from '@domain/errors';

import { PlayerHydrator } from '@data/hydration';

import { SetPlayerDiceUsecase } from '@domain/usecases';

import { DatabaseProtocol, TableGenerator } from '@data/protocols';

export class DatabaseSetPlayerDiceUsecase implements SetPlayerDiceUsecase {
  private readonly tableGenerator: TableGenerator;
  private readonly database: DatabaseProtocol;

  public constructor(deps: DatabaseSetPlayerDiceUsecase.Deps) {
    this.tableGenerator = deps.tableGenerator;
    this.database = deps.database;
  }

  public async execute(id: string, diceID: string): Promise<PlayerModel> {
    try {
      const table = await this.tableGenerator.getTable();

      const player = await this.database.update<PlayerModel.JSON>(table, id, {
        diceID,
      });

      return PlayerHydrator.hydrate(player);
    } catch {
      throw new FailedError({ metadata: { tried: 'change data of player' } });
    }
  }
}

export namespace DatabaseSetPlayerDiceUsecase {
  export type Deps = {
    tableGenerator: TableGenerator;
    database: DatabaseProtocol;
  };
}
