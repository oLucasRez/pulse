import { Color } from '@domain/enums';

import { PlayerModel, UserModel } from '@domain/models';

import { FailedError, ForbiddenError, OutOfBoundError } from '@domain/errors';

import { PlayerHydrator } from '@data/hydration';

import {
  CreatePlayerUsecase,
  GetMeUsecase,
  GetPlayersUsecase,
} from '@domain/usecases';

import { DatabaseProtocol, TableGenerator } from '@data/protocols';

export class DatabaseCreatePlayerUsecase implements CreatePlayerUsecase {
  private readonly getMe: GetMeUsecase;
  private readonly getPlayers: GetPlayersUsecase;
  private readonly database: DatabaseProtocol;
  private readonly tableGenerator: TableGenerator;

  public constructor(deps: DatabaseCreatePlayerUsecase.Deps) {
    this.getMe = deps.getMe;
    this.getPlayers = deps.getPlayers;
    this.database = deps.database;
    this.tableGenerator = deps.tableGenerator;
  }

  public async execute(
    payload: CreatePlayerUsecase.Payload,
  ): Promise<PlayerModel> {
    const { name, color, avatar } = payload;

    const me = await this.getMe.execute();
    if (!me)
      throw new ForbiddenError({
        metadata: { tried: 'create player without session' },
      });

    const players = await this.getPlayers.execute();

    this.iShouldntHaveCreatedYet(me, players);

    this.colorShouldBeUnchosen(color, players);

    await this.shouldntPassMaxPlayers(me, players);

    const table = await this.tableGenerator.getTable();

    let player: PlayerModel.JSON;
    try {
      player = await this.database.insert<PlayerModel.JSON>(table, {
        name,
        color,
        avatar,
        uid: me.uid,
        diceID: null,
        subjectID: null,
        banned: false,
      });
    } catch {
      throw new FailedError({ metadata: { tried: 'create player' } });
    }

    return PlayerHydrator.hydrate(player);
  }

  private iShouldntHaveCreatedYet(me: UserModel, players: PlayerModel[]): void {
    if (players.some(({ uid }) => uid === me.uid))
      throw new ForbiddenError({
        metadata: {
          prop: 'uid',
          value: me.uid,
          tried: 'create player again',
        },
      });
  }

  private colorShouldBeUnchosen(color: Color, players: PlayerModel[]): void {
    if (players.some((player) => !player.banned && player.color === color))
      throw new ForbiddenError({
        metadata: {
          tried: `create player with unavailable color ${color}`,
          prop: 'color',
          value: color,
        },
      });
  }

  private async shouldntPassMaxPlayers(
    me: UserModel,
    players: PlayerModel[],
  ): Promise<void> {
    if (!me.currentGame)
      throw new ForbiddenError({ metadata: { tried: 'create player' } });

    const notBannedPlayers = players.filter((player) => !player.banned);

    if (me.currentGame.config.maxPlayers <= notBannedPlayers.length)
      throw new OutOfBoundError({
        metadata: {
          prop: 'players',
          value: players.length,
          bound: 'above',
          limit: me.currentGame.config.maxPlayers,
        },
      });
  }
}

export namespace DatabaseCreatePlayerUsecase {
  export type Deps = {
    getMe: GetMeUsecase;
    getPlayers: GetPlayersUsecase;
    database: DatabaseProtocol;
    tableGenerator: TableGenerator;
  };
}
