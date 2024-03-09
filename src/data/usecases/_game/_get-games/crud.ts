import { GameModel } from '@domain/models';

import { ForbiddenError } from '@domain/errors';

import { GameHydrator } from '@data/hydration';

import { GetGamesUsecase, GetMeUsecase } from '@domain/usecases';

import { GameObserver } from '@data/observers';

import { GameCRUD } from '@data/cruds';

export class CRUDGetGamesUsecase implements GetGamesUsecase {
  private readonly getMe: GetMeUsecase;
  private readonly gamePublisher: GameObserver.Publisher;
  private readonly gameCRUD: GameCRUD;

  public constructor(deps: CRUDGetGamesUsecase.Deps) {
    this.getMe = deps.getMe;
    this.gamePublisher = deps.gamePublisher;
    this.gameCRUD = deps.gameCRUD;
  }

  public async execute(): Promise<GameModel[]> {
    const me = await this.getMe.execute();
    if (!me)
      throw new ForbiddenError({
        metadata: { tried: 'get games without session' },
      });

    const dto = (await this.gameCRUD.read()).filter(
      (value) => value.uid === me.uid,
    );

    const games = dto.map(GameHydrator.hydrate);

    this.gamePublisher.notifyFetchGames(games);

    return games;
  }
}

export namespace CRUDGetGamesUsecase {
  export type Deps = {
    getMe: GetMeUsecase;
    gamePublisher: GameObserver.Publisher;
    gameCRUD: GameCRUD;
  };
}
