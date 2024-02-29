import { ForbiddenError, NotFoundError } from '@domain/errors';

import { PlayerHydrator } from '@data/hydration';

import { BanPlayerUsecase, GetMeUsecase } from '@domain/usecases';

import { PlayerCRUD } from '@data/cruds';

export class CRUDBanPlayerUsecase implements BanPlayerUsecase {
  private readonly getMe: GetMeUsecase;
  private readonly playerCRUD: PlayerCRUD;

  public constructor(deps: CRUDBanPlayerUsecase.Deps) {
    this.getMe = deps.getMe;
    this.playerCRUD = deps.playerCRUD;
  }

  public async execute(id: string): Promise<void> {
    const me = await this.getMe.execute();
    if (!me)
      throw new ForbiddenError({
        metadata: { tried: 'ban player without session' },
      });

    if (!me.currentGame)
      throw new NotFoundError({ metadata: { entity: 'CurrentGame' } });

    if (me.uid !== me.currentGame.uid)
      throw new ForbiddenError({ metadata: { tried: 'ban player' } });

    const playerDTO = await this.playerCRUD.update(id, {
      banned: true,
    });

    PlayerHydrator.hydrate(playerDTO);
  }
}

export namespace CRUDBanPlayerUsecase {
  export type Deps = {
    getMe: GetMeUsecase;
    playerCRUD: PlayerCRUD;
  };
}
