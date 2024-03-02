import { GameModel } from '@domain/models';

import {
  ForbiddenError,
  NotIntegerError,
  OutOfBoundError,
} from '@domain/errors';

import { GameHydrator } from '@data/hydration';

import { CreateGameUsecase, GetMeUsecase } from '@domain/usecases';

import { GameCRUD } from '@data/cruds';

import { isInteger } from '@domain/utils';

export class CRUDCreateGameUsecase implements CreateGameUsecase {
  private readonly getMe: GetMeUsecase;
  private readonly gameCRUD: GameCRUD;

  public constructor(deps: CRUDCreateGameUsecase.Deps) {
    this.getMe = deps.getMe;
    this.gameCRUD = deps.gameCRUD;
  }

  public async execute(payload: CreateGameUsecase.Payload): Promise<GameModel> {
    const { title = null, config } = payload;

    const me = await this.getMe.execute();
    if (!me)
      throw new ForbiddenError({
        metadata: { tried: 'create game without session' },
      });

    this.maxPlayersShouldBeValid(config.maxPlayers);

    const game = await this.gameCRUD.create({
      uid: me.uid,
      title,
      config,
      started: false,
      state: 'initial:state',
      roundID: null,
      lightspotRoundID: null,
    });

    return GameHydrator.hydrate(game);
  }

  private maxPlayersShouldBeValid(maxPlayers: number): void {
    const prop = 'config.maxPlayers';
    const value = maxPlayers;

    if (maxPlayers < 3)
      throw new OutOfBoundError({
        metadata: { prop, value, bound: 'below', limit: 3 },
      });

    if (maxPlayers > 5)
      throw new OutOfBoundError({
        metadata: { prop, value, bound: 'above', limit: 5 },
      });

    if (!isInteger(maxPlayers))
      throw new NotIntegerError({ metadata: { prop, value } });
  }
}

export namespace CRUDCreateGameUsecase {
  export type Deps = {
    getMe: GetMeUsecase;
    gameCRUD: GameCRUD;
  };
}
