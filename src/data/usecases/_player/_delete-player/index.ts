import { IDeletePlayerUsecase } from '@domain/usecases';

import { IPlayerDAO } from '@data/dao';
import { DeletePlayerObserver } from '@data/observers';

export class DeletePlayerUsecase implements IDeletePlayerUsecase {
  private readonly deletePlayerPublisher: DeletePlayerObserver.Publisher;
  private readonly playerDAO: IPlayerDAO;

  public constructor({ deletePlayerPublisher, playerDAO }: Deps) {
    this.deletePlayerPublisher = deletePlayerPublisher;
    this.playerDAO = playerDAO;
  }

  public async execute(id: string): Promise<void> {
    await this.playerDAO.delete(id);

    this.deletePlayerPublisher.notifyDeletePlayer(id);
  }
}

type Deps = {
  deletePlayerPublisher: DeletePlayerObserver.Publisher;
  playerDAO: IPlayerDAO;
};
