import { GameModel } from '@domain/models';

import { ForbiddenError } from '@domain/errors';

import { GameHydrator } from '@data/hydration';

import { GetGamesUsecase, GetMeUsecase } from '@domain/usecases';

import { GameCRUD } from '@data/cruds';

export class GetGames implements GetGamesUsecase {
  private readonly getMe: GetMeUsecase;
  private readonly gameCRUD: GameCRUD;

  public constructor(deps: GetGames.Deps) {
    this.getMe = deps.getMe;
    this.gameCRUD = deps.gameCRUD;
  }

  public async execute(): Promise<GameModel[]> {
    const me = await this.getMe.execute();
    if (!me)
      throw new ForbiddenError({
        metadata: { tried: 'get games without session' },
      });

    const gameDTOs = await this.gameCRUD.read();

    return Promise.all(gameDTOs.map(GameHydrator.hydrate));
  }
}

export namespace GetGames {
  export type Deps = {
    getMe: GetMeUsecase;
    gameCRUD: GameCRUD;
  };
}
