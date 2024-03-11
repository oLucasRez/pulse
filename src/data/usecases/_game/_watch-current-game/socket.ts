import { FailedError, ForbiddenError } from '@domain/errors';
import { GetMeUsecase, WatchCurrentGameUsecase } from '@domain/usecases';

import { GameDAO } from '@data/dao';
import { GameHydrator } from '@data/hydration';
import { FetchGameObserver } from '@data/observers';
import { SocketProtocol, TableGenerator } from '@data/protocols';

export class SocketWatchCurrentGameUsecase implements WatchCurrentGameUsecase {
  private readonly getMe: GetMeUsecase;
  private readonly socket: SocketProtocol;
  private readonly tableGenerator: TableGenerator;
  private readonly fetchGamePublisher: FetchGameObserver.Publisher;

  public constructor(deps: SocketWatchCurrentGameUsecase.Deps) {
    this.getMe = deps.getMe;
    this.socket = deps.socket;
    this.tableGenerator = deps.tableGenerator;
    this.fetchGamePublisher = deps.fetchGamePublisher;
  }

  public async execute(
    callback: WatchCurrentGameUsecase.Callback,
  ): Promise<WatchCurrentGameUsecase.Response> {
    try {
      const table = await this.tableGenerator.getTable();

      const me = await this.getMe.execute();
      if (!me)
        throw new ForbiddenError({
          metadata: { tried: 'watch current game without session' },
        });

      const unsubscribe = this.socket.watch<GameDAO.DTO>(table, (snapshot) => {
        if (!me.currentGameID) {
          callback(null);
          return;
        }

        const dto = snapshot.find((value) => value.id === me.currentGameID);
        const game = dto ? GameHydrator.hydrate(dto) : null;

        this.fetchGamePublisher.notifyFetchGame(me.currentGameID, game);

        callback(game);
      });

      return unsubscribe;
    } catch {
      throw new FailedError({ metadata: { tried: 'listen games changes' } });
    }
  }
}

export namespace SocketWatchCurrentGameUsecase {
  export type Deps = {
    getMe: GetMeUsecase;
    socket: SocketProtocol;
    tableGenerator: TableGenerator;
    fetchGamePublisher: FetchGameObserver.Publisher;
  };
}
