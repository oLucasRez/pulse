import { DeleteGameUsecase } from '@domain/usecases';

import { DeleteGameObserver } from '@data/observers';

import { GameCRUD } from '@data/cruds';

export class CRUDDeleteGameUsecase implements DeleteGameUsecase {
  private readonly deleteGamePublisher: DeleteGameObserver.Publisher;
  private readonly gameCRUD: GameCRUD;

  public constructor(deps: CRUDDeleteGameUsecase.Deps) {
    this.deleteGamePublisher = deps.deleteGamePublisher;
    this.gameCRUD = deps.gameCRUD;
  }

  public async execute(id: string): Promise<void> {
    await this.gameCRUD.delete(id);

    this.deleteGamePublisher.notifyDeleteGame(id);
  }
}

export namespace CRUDDeleteGameUsecase {
  export type Deps = {
    deleteGamePublisher: DeleteGameObserver.Publisher;
    gameCRUD: GameCRUD;
  };
}
