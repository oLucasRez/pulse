import { GameModel } from '@domain/models';

import { NotFoundError } from '@domain/errors';

import { GameHydrator } from '@data/hydration';

import { ChangeGameUsecase, GetCurrentGameUsecase } from '@domain/usecases';

import { GameObserver } from '@data/observers';

import { GameCRUD } from '@data/cruds';

export class CRUDChangeGameUsecase implements ChangeGameUsecase {
  private readonly getCurrentGame: GetCurrentGameUsecase;
  private readonly gamePublisher: GameObserver.Publisher;
  private readonly gameCRUD: GameCRUD;

  public constructor(deps: CRUDChangeGameUsecase.Deps) {
    this.getCurrentGame = deps.getCurrentGame;
    this.gamePublisher = deps.gamePublisher;
    this.gameCRUD = deps.gameCRUD;
  }

  public async execute(payload: ChangeGameUsecase.Payload): Promise<GameModel> {
    const { title, config } = payload;

    const currentGame = await this.getCurrentGame.execute();

    if (!currentGame)
      throw new NotFoundError({ metadata: { entity: 'CurrentGame' } });

    const dto = await this.gameCRUD.update(currentGame.id, {
      title,
      config,
    });

    const game = GameHydrator.hydrate(dto);

    this.gamePublisher.notifyChangeGame(game);

    return game;
  }
}

export namespace CRUDChangeGameUsecase {
  export type Deps = {
    getCurrentGame: GetCurrentGameUsecase;
    gamePublisher: GameObserver.Publisher;
    gameCRUD: GameCRUD;
  };
}
