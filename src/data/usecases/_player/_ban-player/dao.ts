import { ForbiddenError, NotFoundError } from '@domain/errors';
import {
  BanPlayerUsecase,
  GetCurrentGameUsecase,
  GetMeUsecase,
} from '@domain/usecases';

import { IPlayerDAO } from '@data/dao';
import { PlayerHydrator } from '@data/hydration';
import { BanPlayerObserver } from '@data/observers';

export class DAOBanPlayerUsecase implements BanPlayerUsecase {
  private readonly getCurrentGame: GetCurrentGameUsecase;
  private readonly getMe: GetMeUsecase;
  private readonly banPlayerPublisher: BanPlayerObserver.Publisher;
  private readonly playerDAO: IPlayerDAO;

  public constructor(deps: DAOBanPlayerUsecase.Deps) {
    this.getCurrentGame = deps.getCurrentGame;
    this.getMe = deps.getMe;
    this.banPlayerPublisher = deps.banPlayerPublisher;
    this.playerDAO = deps.playerDAO;
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

export namespace DAOBanPlayerUsecase {
  export type Deps = {
    getCurrentGame: GetCurrentGameUsecase;
    getMe: GetMeUsecase;
    banPlayerPublisher: BanPlayerObserver.Publisher;
    playerDAO: IPlayerDAO;
  };
}
