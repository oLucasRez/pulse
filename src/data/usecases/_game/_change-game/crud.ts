import { GameModel } from '@domain/models';

import { ForbiddenError, NotFoundError } from '@domain/errors';

import { GameHydrator } from '@data/hydration';

import { ChangeGameUsecase, GetMeUsecase } from '@domain/usecases';

import { GameCRUD } from '@data/cruds';

export class CRUDChangeGameUsecase implements ChangeGameUsecase {
  private readonly gameCRUD: GameCRUD;
  private readonly getMe: GetMeUsecase;

  public constructor(deps: CRUDChangeGameUsecase.Deps) {
    this.gameCRUD = deps.gameCRUD;
    this.getMe = deps.getMe;
  }

  public async execute(payload: ChangeGameUsecase.Payload): Promise<GameModel> {
    const { title, config } = payload;

    const me = await this.getMe.execute();

    if (!me)
      throw new ForbiddenError({
        metadata: { tried: 'change game without session' },
      });

    if (!me.currentGame)
      throw new NotFoundError({ metadata: { entity: 'CurrentGame' } });

    const gameDTO = await this.gameCRUD.update(me.currentGame.id, {
      title,
      config,
    });

    return GameHydrator.hydrate(gameDTO);
  }
}

export namespace CRUDChangeGameUsecase {
  export type Deps = {
    gameCRUD: GameCRUD;
    getMe: GetMeUsecase;
  };
}
