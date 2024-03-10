import { Color } from '@domain/enums';

import { GameModel, PlayerModel, UserModel } from '@domain/models';

import { ForbiddenError, NotFoundError, OutOfBoundError } from '@domain/errors';

import { PlayerHydrator } from '@data/hydration';

import {
  CreatePlayerUsecase,
  GetCurrentGameUsecase,
  GetMeUsecase,
  GetPlayersUsecase,
} from '@domain/usecases';

import { CreatePlayerObserver } from '@data/observers';

import { PlayerCRUD } from '@data/cruds';

export class CRUDCreatePlayerUsecase implements CreatePlayerUsecase {
  private readonly getCurrentGame: GetCurrentGameUsecase;
  private readonly getMe: GetMeUsecase;
  private readonly getPlayers: GetPlayersUsecase;
  private readonly createPlayerPublisher: CreatePlayerObserver.Publisher;
  private readonly playerCRUD: PlayerCRUD;

  public constructor(deps: CRUDCreatePlayerUsecase.Deps) {
    this.getCurrentGame = deps.getCurrentGame;
    this.getMe = deps.getMe;
    this.getPlayers = deps.getPlayers;
    this.createPlayerPublisher = deps.createPlayerPublisher;
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

    const players = await this.getPlayers.execute({ includeBanned: true });

    this.iShouldntHaveCreatedYet(me, players);

    this.colorShouldBeUnchosen(color, players);

    const currentGame = await this.getCurrentGame.execute();

    if (!currentGame)
      throw new NotFoundError({ metadata: { entity: 'CurrentGame' } });

    await this.shouldntPassMaxPlayers(currentGame, players);

    const dto = await this.playerCRUD.create({
      name,
      color,
      avatar,
      uid: me.uid,
      diceID: null,
      subjectID: null,
      banned: false,
    });

    const player = PlayerHydrator.hydrate(dto);

    this.createPlayerPublisher.notifyCreatePlayer(player);

    return player;
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
    currentGame: GameModel,
    players: PlayerModel[],
  ): Promise<void> {
    if (!currentGame)
      throw new ForbiddenError({ metadata: { tried: 'create player' } });

    const notBannedPlayers = players.filter((player) => !player.banned);

    if (currentGame.config.maxPlayers <= notBannedPlayers.length)
      throw new OutOfBoundError({
        metadata: {
          prop: 'players',
          value: players.length,
          bound: 'above',
          limit: currentGame.config.maxPlayers,
        },
      });
  }
}

export namespace CRUDCreatePlayerUsecase {
  export type Deps = {
    getCurrentGame: GetCurrentGameUsecase;
    getMe: GetMeUsecase;
    getPlayers: GetPlayersUsecase;
    createPlayerPublisher: CreatePlayerObserver.Publisher;
    playerCRUD: PlayerCRUD;
  };
}
