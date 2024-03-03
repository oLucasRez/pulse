import { GameHydrator } from '@data/hydration';

import {
  GetCurrentGameUsecase,
  WatchCurrentGameUsecase,
} from '@domain/usecases';

import { SocketProtocol, TableGenerator } from '@data/protocols';

import { GameCRUD } from '@data/cruds';

export class SocketWatchCurrentGameUsecase implements WatchCurrentGameUsecase {
  private readonly getCurrentGame: GetCurrentGameUsecase;
  private readonly socket: SocketProtocol;
  private readonly tableGenerator: TableGenerator;

  public constructor(deps: SocketWatchCurrentGameUsecase.Deps) {
    this.getCurrentGame = deps.getCurrentGame;
    this.socket = deps.socket;
    this.tableGenerator = deps.tableGenerator;
  }

  public async execute(
    callback: WatchCurrentGameUsecase.Callback,
  ): Promise<WatchCurrentGameUsecase.Response> {
    const currentGame = await this.getCurrentGame.execute();

    const table = await this.tableGenerator.getTable();

    const unsubscribe = this.socket.watch<GameCRUD.DTO[]>(table, (games) => {
      const currentGameSnapshot = games.find(
        (game) => game.id === currentGame?.id,
      );

      if (currentGameSnapshot)
        callback(GameHydrator.hydrate(currentGameSnapshot));
    });

    return unsubscribe;
  }
}

export namespace SocketWatchCurrentGameUsecase {
  export type Deps = {
    getCurrentGame: GetCurrentGameUsecase;
    tableGenerator: TableGenerator;
    socket: SocketProtocol;
  };
}
