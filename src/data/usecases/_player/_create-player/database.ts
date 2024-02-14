import { Color } from '@domain/enums';

import { PlayerModel, UserModel } from '@domain/models';

import { FailedError, ForbiddenError, OutOfBoundError } from '@domain/errors';

import {
  CreatePlayerUsecase,
  GetCurrentGameUsecase,
  GetMeUsecase,
  GetPlayersUsecase,
} from '@domain/usecases';

import {
  CacheProtocol,
  DatabaseProtocol,
  TableGenerator,
} from '@data/protocols';

export class DatabaseCreatePlayerUsecase implements CreatePlayerUsecase {
  private readonly getCurrentGame: GetCurrentGameUsecase;
  private readonly getMe: GetMeUsecase;
  private readonly getPlayers: GetPlayersUsecase;
  private readonly cache: CacheProtocol;
  private readonly database: DatabaseProtocol;
  private readonly tableGenerator: TableGenerator;

  public constructor(deps: DatabaseCreatePlayerUsecase.Deps) {
    this.getCurrentGame = deps.getCurrentGame;
    this.getMe = deps.getMe;
    this.getPlayers = deps.getPlayers;
    this.cache = deps.cache;
    this.database = deps.database;
    this.tableGenerator = deps.tableGenerator;
  }

  public async execute(
    payload: CreatePlayerUsecase.Payload,
  ): Promise<PlayerModel> {
    const { name, color } = payload;

    const me = await this.getMe.execute();

    const players = await this.getPlayers.execute();

    this.iShouldntHaveCreatedYet(me, players);

    this.colorShouldBeUnchosen(color, players);

    await this.shouldntPassMaxPlayers(players);

    const table = await this.tableGenerator.getTable();

    let player: PlayerModel;
    try {
      player = await this.database.insert<PlayerModel>(table, {
        name,
        color,
        userID: me && me.id,
        subjectID: null,
        banned: false,
      });

      await this.cache.set<string>('myPlayerID', player.id);
    } catch {
      throw new FailedError({ metadata: { tried: 'create player' } });
    }

    return player;
  }

  private iShouldntHaveCreatedYet(
    me: UserModel | null,
    players: PlayerModel[],
  ): void {
    if (!me) return;

    if (players.some(({ userID }) => userID === me.id))
      throw new ForbiddenError({
        metadata: {
          prop: 'userID',
          value: me.id,
          tried: 'create player again',
        },
      });
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
    cache: CacheProtocol;
    database: DatabaseProtocol;
    tableGenerator: TableGenerator;
  };
}
