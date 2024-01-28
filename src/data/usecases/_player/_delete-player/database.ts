import { FailedError } from '@domain/errors';

import {
  ChangeDiceUsecase,
  DeletePlayerUsecase,
  GetPlayerUsecase,
} from '@domain/usecases';

import { DatabaseProtocol, TableGenerator } from '@data/protocols';

export class DatabaseDeletePlayerUsecase implements DeletePlayerUsecase {
  private readonly tableGenerator: TableGenerator;
  private readonly database: DatabaseProtocol;
  private readonly getPlayer: GetPlayerUsecase;
  private readonly changeDice: ChangeDiceUsecase;

  public constructor(deps: DatabaseDeletePlayerUsecase.Deps) {
    this.tableGenerator = deps.tableGenerator;
    this.database = deps.database;
    this.getPlayer = deps.getPlayer;
    this.changeDice = deps.changeDice;
  }

  public async execute(id: string): Promise<void> {
    const player = await this.getPlayer.execute(id);

    await this.changeDice.execute(player.diceID, { ownerID: null });

    try {
      const table = await this.tableGenerator.getTable();

      await this.database.delete(table, id);
    } catch {
      throw new FailedError({ metadata: { tried: 'delete player' } });
    }
  }
}

export namespace DatabaseDeletePlayerUsecase {
  export type Deps = {
    tableGenerator: TableGenerator;
    database: DatabaseProtocol;
    getPlayer: GetPlayerUsecase;
    changeDice: ChangeDiceUsecase;
  };
}
