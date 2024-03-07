import { DeletePlayerUsecase } from '@domain/usecases';

import { PlayerObserver } from '@data/observers';

import { PlayerCRUD } from '@data/cruds';

export class CRUDDeletePlayerUsecase implements DeletePlayerUsecase {
  private readonly playerPublisher: PlayerObserver.Publisher;
  private readonly playerCRUD: PlayerCRUD;

  public constructor(deps: CRUDDeletePlayerUsecase.Deps) {
    this.playerPublisher = deps.playerPublisher;
    this.playerCRUD = deps.playerCRUD;
  }

  public async execute(id: string): Promise<void> {
    await this.playerCRUD.delete(id);

    this.playerPublisher.notifyDeletePlayer(id);
  }
}

export namespace CRUDDeletePlayerUsecase {
  export type Deps = {
    playerPublisher: PlayerObserver.Publisher;
    playerCRUD: PlayerCRUD;
  };
}
