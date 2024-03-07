import { DeleteGameUsecase } from '@domain/usecases';

import { GameObserver } from '@data/observers';

import { GameCRUD } from '@data/cruds';

export class CRUDDeleteGameUsecase implements DeleteGameUsecase {
  private readonly gamePublisher: GameObserver.Publisher;
  private readonly gameCRUD: GameCRUD;

  public constructor(deps: CRUDDeleteGameUsecase.Deps) {
    this.gamePublisher = deps.gamePublisher;
    this.gameCRUD = deps.gameCRUD;
  }

  public async execute(id: string): Promise<void> {
    await this.gameCRUD.delete(id);

    this.gamePublisher.notifyDeleteGame(id);
  }
}

export namespace CRUDDeleteGameUsecase {
  export type Deps = {
    gamePublisher: GameObserver.Publisher;
    gameCRUD: GameCRUD;
  };
}
