import { DeletePlayerUsecase } from '@domain/usecases';

import { DeletePlayerObserver } from '@data/observers';

import { PlayerCRUD } from '@data/cruds';

export class CRUDDeletePlayerUsecase implements DeletePlayerUsecase {
  private readonly deletePlayerPublisher: DeletePlayerObserver.Publisher;
  private readonly playerCRUD: PlayerCRUD;

  public constructor(deps: CRUDDeletePlayerUsecase.Deps) {
    this.deletePlayerPublisher = deps.deletePlayerPublisher;
    this.playerCRUD = deps.playerCRUD;
  }

  public async execute(id: string): Promise<void> {
    await this.playerCRUD.delete(id);

    this.deletePlayerPublisher.notifyDeletePlayer(id);
  }
}

export namespace CRUDDeletePlayerUsecase {
  export type Deps = {
    deletePlayerPublisher: DeletePlayerObserver.Publisher;
    playerCRUD: PlayerCRUD;
  };
}
