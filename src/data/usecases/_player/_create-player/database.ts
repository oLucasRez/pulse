import { Color } from '@domain/enums';

import { PlayerModel } from '@domain/models';

import { FailedError, ForbiddenError } from '@domain/errors';

import {
  ChangeDiceUsecase,
  CreatePlayerUsecase,
  DeletePlayerUsecase,
  GetDiceUsecase,
  GetPlayersUsecase,
} from '@domain/usecases';

import { DatabaseProtocol, TableGenerator } from '@data/protocols';

export class DatabaseCreatePlayerUsecase implements CreatePlayerUsecase {
  private readonly tableGenerator: TableGenerator;
  private readonly database: DatabaseProtocol;
  private readonly getDice: GetDiceUsecase;
  private readonly getPlayers: GetPlayersUsecase;
  private readonly changeDice: ChangeDiceUsecase;
  private readonly deletePlayer: DeletePlayerUsecase;

  public constructor(deps: DatabaseCreatePlayerUsecase.Deps) {
    this.tableGenerator = deps.tableGenerator;
    this.database = deps.database;
    this.getDice = deps.getDice;
    this.getPlayers = deps.getPlayers;
    this.changeDice = deps.changeDice;
    this.deletePlayer = deps.deletePlayer;
  }

  public async execute(
    payload: CreatePlayerUsecase.Payload,
  ): Promise<PlayerModel> {
    const { name, color, userID = null, diceID } = payload;

    await this.diceShouldExists(diceID);

    await this.colorShouldBeUnchosen(color);

    const table = await this.tableGenerator.getTable();

    let player: PlayerModel;
    try {
      player = await this.database.insert<PlayerModel>(table, {
        name,
        color,
        userID,
        diceID,
        subjectID: null,
      });
    } catch {
      throw new FailedError({ metadata: { tried: 'create player' } });
    }

    try {
      await this.changeDice.execute(diceID, { ownerID: player.id });
    } catch (e) {
      if (e instanceof ForbiddenError)
        await this.deletePlayer.execute(player.id);

      throw e;
    }

    return player;
  }

  private async diceShouldExists(diceID: string): Promise<void> {
    await this.getDice.execute(diceID);
  }

  private async colorShouldBeUnchosen(color: Color): Promise<void> {
    const players = await this.getPlayers.execute();

    if (players.some((player) => player.color === color))
      throw new ForbiddenError({
        metadata: {
          tried: `create player with unavailable color ${color}`,
          prop: 'color',
          value: color,
        },
      });
  }
}

export namespace DatabaseCreatePlayerUsecase {
  export type Deps = {
    tableGenerator: TableGenerator;
    database: DatabaseProtocol;
    getDice: GetDiceUsecase;
    getPlayers: GetPlayersUsecase;
    changeDice: ChangeDiceUsecase;
    deletePlayer: DeletePlayerUsecase;
  };
}
