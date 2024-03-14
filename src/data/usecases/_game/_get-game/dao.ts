import { GameModel } from '@domain/models';
import { GetGameUsecase } from '@domain/usecases';

import { GameDAO } from '@data/dao';
import { GameHydrator } from '@data/hydration';
import { FetchGameObserver } from '@data/observers';

export class DAOGetGameUsecase implements GetGameUsecase {
  private readonly fetchGamePublisher: FetchGameObserver.Publisher;
  private readonly gameDAO: GameDAO;

  public constructor(deps: DAOGetGameUsecase.Deps) {
    this.fetchGamePublisher = deps.fetchGamePublisher;
    this.gameDAO = deps.gameDAO;
  }

  public async execute(id: string): Promise<GameModel | null> {
    const dto = await this.gameDAO.read(id);

    const game = dto ? GameHydrator.hydrate(dto) : null;

    this.fetchGamePublisher.notifyFetchGame(id, game);

    return game;
  }
}

export namespace DAOGetGameUsecase {
  export type Deps = {
    fetchGamePublisher: FetchGameObserver.Publisher;
    gameDAO: GameDAO;
  };
}
