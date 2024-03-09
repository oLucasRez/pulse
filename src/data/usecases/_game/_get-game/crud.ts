import { GameModel } from '@domain/models';

import { GameHydrator } from '@data/hydration';

import { GetGameUsecase } from '@domain/usecases';

import { GameObserver } from '@data/observers';

import { GameCRUD } from '@data/cruds';

export class CRUDGetGameUsecase implements GetGameUsecase {
  private readonly gamePublisher: GameObserver.Publisher;
  private readonly gameCRUD: GameCRUD;

  public constructor(deps: CRUDGetGameUsecase.Deps) {
    this.gamePublisher = deps.gamePublisher;
    this.gameCRUD = deps.gameCRUD;
  }

  public async execute(id: string): Promise<GameModel | null> {
    const dto = await this.gameCRUD.read(id);

    const game = dto ? GameHydrator.hydrate(dto) : null;

    this.gamePublisher.notifyFetchGame(id, game);

    return game;
  }
}

export namespace CRUDGetGameUsecase {
  export type Deps = {
    gamePublisher: GameObserver.Publisher;
    gameCRUD: GameCRUD;
  };
}
