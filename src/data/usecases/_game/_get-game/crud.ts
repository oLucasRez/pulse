import { GameModel } from '@domain/models';

import { GameHydrator } from '@data/hydration';

import { GetGameUsecase } from '@domain/usecases';

import { FetchGameObserver } from '@data/observers';

import { GameCRUD } from '@data/cruds';

export class CRUDGetGameUsecase implements GetGameUsecase {
  private readonly fetchGamePublisher: FetchGameObserver.Publisher;
  private readonly gameCRUD: GameCRUD;

  public constructor(deps: CRUDGetGameUsecase.Deps) {
    this.fetchGamePublisher = deps.fetchGamePublisher;
    this.gameCRUD = deps.gameCRUD;
  }

  public async execute(id: string): Promise<GameModel | null> {
    const dto = await this.gameCRUD.read(id);

    const game = dto ? GameHydrator.hydrate(dto) : null;

    this.fetchGamePublisher.notifyFetchGame(id, game);

    return game;
  }
}

export namespace CRUDGetGameUsecase {
  export type Deps = {
    fetchGamePublisher: FetchGameObserver.Publisher;
    gameCRUD: GameCRUD;
  };
}
