import { DeleteGameUsecase } from '@domain/usecases';

import { GameCRUD } from '@data/cruds';

export class DeleteGame implements DeleteGameUsecase {
  private readonly gameCRUD: GameCRUD;

  public constructor(deps: DeleteGame.Deps) {
    this.gameCRUD = deps.gameCRUD;
  }

  public async execute(id: string): Promise<void> {
    await this.gameCRUD.delete(id);
  }
}

export namespace DeleteGame {
  export type Deps = {
    gameCRUD: GameCRUD;
  };
}
