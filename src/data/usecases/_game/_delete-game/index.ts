import { IDeleteGameUsecase } from '@domain/usecases';

import { IGameDAO } from '@data/dao';
import { DeleteGameObserver } from '@data/observers';

export class DeleteGameUsecase implements IDeleteGameUsecase {
  private readonly deleteGamePublisher: DeleteGameObserver.Publisher;
  private readonly gameDAO: IGameDAO;

  public constructor({ deleteGamePublisher, gameDAO }: Deps) {
    this.deleteGamePublisher = deleteGamePublisher;
    this.gameDAO = gameDAO;
  }

  public async execute(id: string): Promise<void> {
    await this.gameDAO.delete(id);

    this.deleteGamePublisher.notifyDeleteGame(id);
  }
}

type Deps = {
  deleteGamePublisher: DeleteGameObserver.Publisher;
  gameDAO: IGameDAO;
};
