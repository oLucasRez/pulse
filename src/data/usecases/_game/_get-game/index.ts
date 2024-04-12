import { GameModel } from '@domain/models';
import { IGetGameUsecase } from '@domain/usecases';

import { IGameDAO } from '@data/dao';
import { GameHydrator } from '@data/hydration';
import { FetchGameObserver } from '@data/observers';

export class GetGameUsecase implements IGetGameUsecase {
  private readonly fetchGamePublisher: FetchGameObserver.Publisher;
  private readonly gameDAO: IGameDAO;

  public constructor({ fetchGamePublisher, gameDAO }: Deps) {
    this.fetchGamePublisher = fetchGamePublisher;
    this.gameDAO = gameDAO;
  }

  public async execute(id: string): Promise<GameModel | null> {
    const dto = await this.gameDAO.getByID(id);

    const game = dto ? GameHydrator.hydrate(dto) : null;

    this.fetchGamePublisher.notifyFetchGame(id, game);

    return game;
  }
}

type Deps = {
  fetchGamePublisher: FetchGameObserver.Publisher;
  gameDAO: IGameDAO;
};
