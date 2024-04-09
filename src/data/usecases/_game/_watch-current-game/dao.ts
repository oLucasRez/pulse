import { ForbiddenError } from '@domain/errors';
import { GetMeUsecase, WatchCurrentGameUsecase } from '@domain/usecases';

import { IGameDAO } from '@data/dao';
import { GameHydrator } from '@data/hydration';
import { FetchGameObserver } from '@data/observers';

export class DAOWatchCurrentGameUsecase implements WatchCurrentGameUsecase {
  private readonly getMe: GetMeUsecase;
  private readonly gameDAO: IGameDAO;
  private readonly fetchGamePublisher: FetchGameObserver.Publisher;

  public constructor(deps: SocketWatchCurrentGameUsecase.Deps) {
    this.getMe = deps.getMe;
    this.gameDAO = deps.gameDAO;
    this.fetchGamePublisher = deps.fetchGamePublisher;
  }

  public async execute(
    callback: WatchCurrentGameUsecase.Callback,
  ): Promise<WatchCurrentGameUsecase.Response> {
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

export namespace SocketWatchCurrentGameUsecase {
  export type Deps = {
    getMe: GetMeUsecase;
    gameDAO: IGameDAO;
    fetchGamePublisher: FetchGameObserver.Publisher;
  };
}
