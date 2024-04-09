import { DeletePlayerUsecase } from '@domain/usecases';

import { IPlayerDAO } from '@data/dao';
import { DeletePlayerObserver } from '@data/observers';

export class DAODeletePlayerUsecase implements DeletePlayerUsecase {
  private readonly deletePlayerPublisher: DeletePlayerObserver.Publisher;
  private readonly playerDAO: IPlayerDAO;

  public constructor(deps: DAODeletePlayerUsecase.Deps) {
    this.deletePlayerPublisher = deps.deletePlayerPublisher;
    this.playerDAO = deps.playerDAO;
  }

  public async execute(id: string): Promise<void> {
    await this.playerDAO.delete(id);

    this.deletePlayerPublisher.notifyDeletePlayer(id);
  }
}

export namespace DAODeletePlayerUsecase {
  export type Deps = {
    deletePlayerPublisher: DeletePlayerObserver.Publisher;
    playerDAO: IPlayerDAO;
  };
}
