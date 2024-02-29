import { DeleteGameUsecase } from '@domain/usecases';

import { GameCRUD } from '@data/cruds';

export class CRUDDeleteGameUsecase implements DeleteGameUsecase {
  private readonly gameCRUD: GameCRUD;

  public constructor(deps: CRUDDeleteGameUsecase.Deps) {
    this.gameCRUD = deps.gameCRUD;
  }

  public async execute(id: string): Promise<void> {
    await this.gameCRUD.delete(id);
  }
}

export namespace CRUDDeleteGameUsecase {
  export type Deps = {
    gameCRUD: GameCRUD;
  };
}
