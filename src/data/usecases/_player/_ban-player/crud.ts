import { ForbiddenError, NotFoundError } from '@domain/errors';

import { PlayerHydrator } from '@data/hydration';

import {
  BanPlayerUsecase,
  GetCurrentGameUsecase,
  GetMeUsecase,
} from '@domain/usecases';

import { BanPlayerObserver } from '@data/observers';

import { PlayerCRUD } from '@data/cruds';

export class CRUDBanPlayerUsecase implements BanPlayerUsecase {
  private readonly getCurrentGame: GetCurrentGameUsecase;
  private readonly getMe: GetMeUsecase;
  private readonly banPlayerPublisher: BanPlayerObserver.Publisher;
  private readonly playerCRUD: PlayerCRUD;

  public constructor(deps: CRUDBanPlayerUsecase.Deps) {
    this.getCurrentGame = deps.getCurrentGame;
    this.getMe = deps.getMe;
    this.banPlayerPublisher = deps.banPlayerPublisher;
    this.playerCRUD = deps.playerCRUD;
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

    const dto = await this.playerCRUD.update(id, {
      banned: true,
    });

    const player = PlayerHydrator.hydrate(dto);

    this.banPlayerPublisher.notifyBanPlayer(player);
  }
}

export namespace CRUDBanPlayerUsecase {
  export type Deps = {
    getCurrentGame: GetCurrentGameUsecase;
    getMe: GetMeUsecase;
    banPlayerPublisher: BanPlayerObserver.Publisher;
    playerCRUD: PlayerCRUD;
  };
}
