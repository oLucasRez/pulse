import { ForbiddenError } from '@domain/errors';
import { IGetMeUsecase, IWatchCurrentGameUsecase } from '@domain/usecases';

import { IGameDAO } from '@data/dao';
import { GameHydrator } from '@data/hydration';
import { FetchGameObserver } from '@data/observers';

export class WatchCurrentGameUsecase implements IWatchCurrentGameUsecase {
  private readonly getMe: IGetMeUsecase;
  private readonly gameDAO: IGameDAO;
  private readonly fetchGamePublisher: FetchGameObserver.Publisher;

  public constructor({ getMe, gameDAO, fetchGamePublisher }: Deps) {
    this.getMe = getMe;
    this.gameDAO = gameDAO;
    this.fetchGamePublisher = fetchGamePublisher;
  }

  public async execute(
    callback: IWatchCurrentGameUsecase.Callback,
  ): Promise<IWatchCurrentGameUsecase.Response> {
    const me = await this.getMe.execute();
    if (!me)
      throw new ForbiddenError({
        metadata: { tried: 'watch current game without session' },
      });

    return this.gameDAO.watch((dtos) => {
      if (!me.currentGameID) {
        callback(null);
        return;
      }

      const dto = dtos.find((value) => value.id === me.currentGameID);
      const game = dto ? GameHydrator.hydrate(dto) : null;

      this.fetchGamePublisher.notifyFetchGame(me.currentGameID, game);

      callback(game);
    });
  }
}

type Deps = {
  getMe: IGetMeUsecase;
  gameDAO: IGameDAO;
  fetchGamePublisher: FetchGameObserver.Publisher;
};
