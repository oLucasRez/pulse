import { ForbiddenError, NotFoundError } from '@domain/errors';
import { PlayerModel } from '@domain/models';
import {
  IBanPlayerUsecase,
  IGetCurrentGameUsecase,
  IGetMeUsecase,
} from '@domain/usecases';

import { IPlayerDAO } from '@data/dao';
import { IPlayerHydrator } from '@data/hydration';

export class BanPlayerUsecase implements IBanPlayerUsecase {
  private readonly getCurrentGame: IGetCurrentGameUsecase;
  private readonly getMe: IGetMeUsecase;
  private readonly playerDAO: IPlayerDAO;
  private readonly playerHydrator: IPlayerHydrator;
  public constructor({
    getCurrentGame,
    getMe,
    playerDAO,
    playerHydrator,
  }: Deps) {
    this.getCurrentGame = getCurrentGame;
    this.getMe = getMe;
    this.playerDAO = playerDAO;
    this.playerHydrator = playerHydrator;
  }

  public async execute(id: string): Promise<PlayerModel> {
    const currentGame = await this.getCurrentGame.execute();

    if (!currentGame)
      throw new NotFoundError({ metadata: { entity: 'CurrentGame' } });

    const me = await this.getMe.execute();

    if (!me)
      throw new ForbiddenError({
        metadata: { tried: 'ban player without session' },
      });

    if (me.uid !== currentGame.uid)
      throw new ForbiddenError({
        metadata: { tried: 'ban player if Im not the host' },
      });

    const dto = await this.playerDAO.update(id, {
      banned: true,
    });

    const player = await this.playerHydrator.hydrate(dto);

    return player;
  }
}

type Deps = {
  getCurrentGame: IGetCurrentGameUsecase;
  getMe: IGetMeUsecase;
  playerDAO: IPlayerDAO;
  playerHydrator: IPlayerHydrator;
};
