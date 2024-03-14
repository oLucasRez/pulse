import { DeleteGameUsecase } from '@domain/usecases';

import { GameDAO } from '@data/dao';
import { DeleteGameObserver } from '@data/observers';

export class DAODeleteGameUsecase implements DeleteGameUsecase {
  private readonly deleteGamePublisher: DeleteGameObserver.Publisher;
  private readonly gameDAO: GameDAO;

  public constructor(deps: DAODeleteGameUsecase.Deps) {
    this.deleteGamePublisher = deps.deleteGamePublisher;
    this.gameDAO = deps.gameDAO;
  }

  public async execute(id: string): Promise<void> {
    await this.gameDAO.delete(id);

    this.deleteGamePublisher.notifyDeleteGame(id);
  }
}

export namespace DAODeleteGameUsecase {
  export type Deps = {
    deleteGamePublisher: DeleteGameObserver.Publisher;
    gameDAO: GameDAO;
  };
}
