import { DeletePlayerUsecase } from '@domain/usecases';

import { PlayerCRUD } from '@data/cruds';

export class CRUDDeletePlayerUsecase implements DeletePlayerUsecase {
  private readonly playerCRUD: PlayerCRUD;

  public constructor(deps: CRUDDeletePlayerUsecase.Deps) {
    this.playerCRUD = deps.playerCRUD;
  }

  public async execute(id: string): Promise<void> {
    await this.playerCRUD.delete(id);
  }
}

export namespace CRUDDeletePlayerUsecase {
  export type Deps = {
    playerCRUD: PlayerCRUD;
  };
}
