import { ForbiddenError, NotFoundError } from '@domain/errors';
import {
  IBanPlayerUsecase,
  IGetCurrentGameUsecase,
  IGetMeUsecase,
} from '@domain/usecases';

import { IPlayerDAO } from '@data/dao';
import { PlayerHydrator } from '@data/hydration';
import { BanPlayerObserver } from '@data/observers';

export class BanPlayerUsecase implements IBanPlayerUsecase {
  private readonly getCurrentGame: IGetCurrentGameUsecase;
  private readonly getMe: IGetMeUsecase;
  private readonly banPlayerPublisher: BanPlayerObserver.Publisher;
  private readonly playerDAO: IPlayerDAO;

  public constructor({
    getCurrentGame,
    getMe,
    banPlayerPublisher,
    playerDAO,
  }: Deps) {
    this.getCurrentGame = getCurrentGame;
    this.getMe = getMe;
    this.banPlayerPublisher = banPlayerPublisher;
    this.playerDAO = playerDAO;
  }

  public async execute(id: string): Promise<void> {
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

    const player = PlayerHydrator.hydrate(dto);

    this.banPlayerPublisher.notifyBanPlayer(player);
  }
}

type Deps = {
  getCurrentGame: IGetCurrentGameUsecase;
  getMe: IGetMeUsecase;
  banPlayerPublisher: BanPlayerObserver.Publisher;
  playerDAO: IPlayerDAO;
};
