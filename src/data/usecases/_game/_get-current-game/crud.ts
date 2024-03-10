import { GameModel } from '@domain/models';

import { GameHydrator } from '@data/hydration';

import { GetCurrentGameUsecase, GetMeUsecase } from '@domain/usecases';

import { FetchCurrentGameObserver } from '@data/observers';

import { GameCRUD } from '@data/cruds';

export class CRUDGetCurrentGameUsecase implements GetCurrentGameUsecase {
  private readonly getMe: GetMeUsecase;
  private readonly fetchCurrentGamePublisher: FetchCurrentGameObserver.Publisher;
  private readonly gameCRUD: GameCRUD;

  public constructor(deps: CRUDGetCurrentGameUsecase.Deps) {
    this.getMe = deps.getMe;
    this.fetchCurrentGamePublisher = deps.fetchCurrentGamePublisher;
    this.gameCRUD = deps.gameCRUD;
  }

  public async execute(): Promise<GameModel | null> {
    const me = await this.getMe.execute();

    if (!me?.currentGameID) return null;

    const dto = await this.gameCRUD.read(me.currentGameID);

    const game = dto ? GameHydrator.hydrate(dto) : null;

    this.fetchCurrentGamePublisher.notifyFetchCurrentGame(game);

    return game;
  }
}

export namespace CRUDGetCurrentGameUsecase {
  export type Deps = {
    getMe: GetMeUsecase;
    fetchCurrentGamePublisher: FetchCurrentGameObserver.Publisher;
    gameCRUD: GameCRUD;
  };
}
