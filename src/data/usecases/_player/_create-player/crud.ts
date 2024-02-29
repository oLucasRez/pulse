import { Color } from '@domain/enums';

import { PlayerModel, UserModel } from '@domain/models';

import { ForbiddenError, OutOfBoundError } from '@domain/errors';

import { PlayerHydrator } from '@data/hydration';

import {
  CreatePlayerUsecase,
  GetMeUsecase,
  GetPlayersUsecase,
} from '@domain/usecases';

import { PlayerCRUD } from '@data/cruds';

export class CRUDCreatePlayerUsecase implements CreatePlayerUsecase {
  private readonly getMe: GetMeUsecase;
  private readonly getPlayers: GetPlayersUsecase;
  private readonly playerCRUD: PlayerCRUD;

  public constructor(deps: CRUDCreatePlayerUsecase.Deps) {
    this.getMe = deps.getMe;
    this.getPlayers = deps.getPlayers;
    this.playerCRUD = deps.playerCRUD;
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

    const playerDTO = await this.playerCRUD.create({
      name,
      color,
      avatar,
      uid: me.uid,
      diceID: null,
      subjectID: null,
      banned: false,
    });

    return PlayerHydrator.hydrate(playerDTO);
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

export namespace CRUDCreatePlayerUsecase {
  export type Deps = {
    getMe: GetMeUsecase;
    getPlayers: GetPlayersUsecase;
    playerCRUD: PlayerCRUD;
  };
}
