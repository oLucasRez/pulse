import { PlayerModel } from '@domain/models';

import { FailedError } from '@domain/errors';

import { CreatePlayerUsecase, GetDiceUsecase } from '@domain/usecases';

import { DatabaseProtocol } from '@data/protocols';

export class DatabaseCreatePlayerUsecase implements CreatePlayerUsecase {
  private readonly table: string;
  private readonly database: DatabaseProtocol;
  private readonly getDice: GetDiceUsecase;

  public constructor(deps: DatabaseCreatePlayerUsecase.Deps) {
    this.table = deps.table;
    this.database = deps.database;
    this.getDice = deps.getDice;
  }

  public async execute(
    payload: CreatePlayerUsecase.Payload,
  ): Promise<PlayerModel> {
    const { name, color, gameID, diceID } = payload;

    await this.diceShouldExists(diceID);

    try {
      const player = await this.database.insert<PlayerModel>(this.table, {
        name,
        color,
        gameID,
        diceID,
        subjectID: null,
      });

      return player;
    } catch {
      throw new FailedError('Failed to create player');
    }
  }

  private async diceShouldExists(diceID: string): Promise<void> {
    await this.getDice.execute(diceID);
  }
}

export namespace DatabaseCreatePlayerUsecase {
  export type Deps = {
    table: string;
    database: DatabaseProtocol;
    getDice: GetDiceUsecase;
  };
}
