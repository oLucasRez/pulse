import { UserModel } from '@domain/models';

import { FailedError } from '@domain/errors';

import { GetMeUsecase, WatchMeUsecase } from '@domain/usecases';

import { SocketProtocol, TableGenerator } from '@data/protocols';

export class SocketWatchMeUsecase implements WatchMeUsecase {
  private readonly getMe: GetMeUsecase;
  private readonly tableGenerator: TableGenerator;
  private readonly socket: SocketProtocol;

  public constructor(deps: SocketWatchMeUsecase.Deps) {
    this.getMe = deps.getMe;
    this.tableGenerator = deps.tableGenerator;
    this.socket = deps.socket;
  }

  public async execute(
    callback: WatchMeUsecase.Callback,
  ): Promise<WatchMeUsecase.Response> {
    try {
      const table = await this.tableGenerator.getTable();

      const me = await this.getMe.execute();

      const unsubscribe = this.socket.watch<UserModel[]>(table, (users) => {
        if (!me) callback(null);
        else callback(users.find((user) => user.uid === me.uid) ?? null);
      });

      return unsubscribe;
    } catch {
      throw new FailedError({ metadata: { tried: 'listen "me" changes' } });
    }
  }
}

export namespace SocketWatchMeUsecase {
  export type Deps = {
    getMe: GetMeUsecase;
    tableGenerator: TableGenerator;
    socket: SocketProtocol;
  };
}
