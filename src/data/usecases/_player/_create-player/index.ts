import { Color } from '@domain/enums';
import { ForbiddenError, NotFoundError, OutOfBoundError } from '@domain/errors';
import { GameModel, PlayerModel, UserModel } from '@domain/models';
import {
  ICreatePlayerUsecase,
  IGetCurrentGameUsecase,
  IGetMeUsecase,
  IGetPlayersUsecase,
} from '@domain/usecases';

import { IPlayerDAO } from '@data/dao';
import { IPlayerHydrator } from '@data/hydration';

export class CreatePlayerUsecase implements ICreatePlayerUsecase {
  private readonly getCurrentGame: IGetCurrentGameUsecase;
  private readonly getMe: IGetMeUsecase;
  private readonly getPlayers: IGetPlayersUsecase;
  private readonly playerDAO: IPlayerDAO;
  private readonly playerHydrator: IPlayerHydrator;
  public constructor({
    getCurrentGame,
    getMe,
    getPlayers,
    playerDAO,
    playerHydrator,
  }: Deps) {
    this.getCurrentGame = getCurrentGame;
    this.getMe = getMe;
    this.getPlayers = getPlayers;
    this.playerDAO = playerDAO;
    this.playerHydrator = playerHydrator;
  }

  public async execute(
    payload: ICreatePlayerUsecase.Payload,
  ): Promise<PlayerModel> {
    const { name, color, avatar } = payload;

    const me = await this.getMe.execute();
    if (!me)
      throw new ForbiddenError({
        metadata: { tried: 'create player without session' },
      });

    const players = await this.getPlayers.execute({ includeBanned: true });
    const notBannedPlayers = players.filter((value) => !value.banned);

    this.iShouldntHaveCreatedYet(me, players);

    this.colorShouldBeUnchosen(color, notBannedPlayers);

    const currentGame = await this.getCurrentGame.execute();

    if (!currentGame)
      throw new NotFoundError({ metadata: { entity: 'CurrentGame' } });

    await this.shouldntPassMaxPlayers(currentGame, notBannedPlayers);

    const dto = await this.playerDAO.create({
      name,
      color,
      avatar,
      uid: me.uid,
      diceID: null,
      subjectID: null,
      banned: false,
      order: notBannedPlayers.length,
    });

    const player = await this.playerHydrator.hydrate(dto);

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
    if (players.some((player) => player.color === color))
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

    if (currentGame.config.maxPlayers <= players.length)
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

type Deps = {
  getCurrentGame: IGetCurrentGameUsecase;
  getMe: IGetMeUsecase;
  getPlayers: IGetPlayersUsecase;
  playerDAO: IPlayerDAO;
  playerHydrator: IPlayerHydrator;
};
