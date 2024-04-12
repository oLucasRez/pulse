import { GameModel } from '@domain/models';
import { IGetCurrentGameUsecase, IGetMeUsecase } from '@domain/usecases';

import { IGameDAO } from '@data/dao';
import { GameHydrator } from '@data/hydration';
import { FetchGameObserver } from '@data/observers';

export class GetCurrentGameUsecase implements IGetCurrentGameUsecase {
  private readonly getMe: IGetMeUsecase;
  private readonly fetchGamePublisher: FetchGameObserver.Publisher;
  private readonly gameDAO: IGameDAO;

  public constructor({ getMe, fetchGamePublisher, gameDAO }: Deps) {
    this.getMe = getMe;
    this.fetchGamePublisher = fetchGamePublisher;
    this.gameDAO = gameDAO;
  }

  public async execute(): Promise<GameModel | null> {
    const me = await this.getMe.execute();

    if (!me?.currentGameID) return null;

    const dto = await this.gameDAO.getByID(me.currentGameID);

    const game = dto ? GameHydrator.hydrate(dto) : null;

    this.fetchGamePublisher.notifyFetchGame(me.currentGameID, game);

    return game;
  }
}

type Deps = {
  getMe: IGetMeUsecase;
  fetchGamePublisher: FetchGameObserver.Publisher;
  gameDAO: IGameDAO;
};
