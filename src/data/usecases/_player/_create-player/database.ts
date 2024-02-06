import { Color } from '@domain/enums';

import { PlayerModel } from '@domain/models';

import { FailedError, ForbiddenError, OutOfBoundError } from '@domain/errors';

import {
  CreatePlayerUsecase,
  GetCurrentGameUsecase,
  GetMeUsecase,
  GetPlayersUsecase,
} from '@domain/usecases';

import { DatabaseProtocol, TableGenerator } from '@data/protocols';

export class DatabaseCreatePlayerUsecase implements CreatePlayerUsecase {
  private readonly getCurrentGame: GetCurrentGameUsecase;
  private readonly getMe: GetMeUsecase;
  private readonly getPlayers: GetPlayersUsecase;
  private readonly database: DatabaseProtocol;
  private readonly tableGenerator: TableGenerator;

  public constructor(deps: DatabaseCreatePlayerUsecase.Deps) {
    this.getCurrentGame = deps.getCurrentGame;
    this.getMe = deps.getMe;
    this.getPlayers = deps.getPlayers;
    this.database = deps.database;
    this.tableGenerator = deps.tableGenerator;
  }

  public async execute(
    payload: CreatePlayerUsecase.Payload,
  ): Promise<PlayerModel> {
    const { name, color } = payload;

    const user = await this.getMe.execute();

    const players = await this.getPlayers.execute();

    this.colorShouldBeUnchosen(color, players);

    await this.shouldntPassMaxPlayers(players);

    const table = await this.tableGenerator.getTable();

    let player: PlayerModel;
    try {
      player = await this.database.insert<PlayerModel>(table, {
        name,
        color,
        userID: user?.id ?? null,
        subjectID: null,
      });
    } catch {
      throw new FailedError({ metadata: { tried: 'create player' } });
    }

    return player;
  }

  private colorShouldBeUnchosen(color: Color, players: PlayerModel[]): void {
    if (players.some((player) => player.color === color))
      throw new ForbiddenError({
        metadata: {
          tried: `create player with unavailable color ${color}`,
          prop: 'color',
          value: color,
        },
      });
  }

  private async shouldntPassMaxPlayers(players: PlayerModel[]): Promise<void> {
    const game = await this.getCurrentGame.execute();

    if (!game)
      throw new ForbiddenError({ metadata: { tried: 'create player' } });

    if (game.config.maxPlayers <= players.length)
      throw new OutOfBoundError({
        metadata: {
          prop: 'players',
          value: players.length,
          bound: 'above',
          limit: game.config.maxPlayers,
        },
      });
  }
}

export namespace DatabaseCreatePlayerUsecase {
  export type Deps = {
    getCurrentGame: GetCurrentGameUsecase;
    getMe: GetMeUsecase;
    getPlayers: GetPlayersUsecase;
    database: DatabaseProtocol;
    tableGenerator: TableGenerator;
  };
}
