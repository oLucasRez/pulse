import { SubjectModel } from '@domain/models';

import { FailedError } from '@domain/errors';

import { SubjectHydrator } from '@data/hydration';

import { WatchSubjectsUsecase } from '@domain/usecases';

import { SocketProtocol, TableGenerator } from '@data/protocols';

export class SocketWatchSubjectsUsecase implements WatchSubjectsUsecase {
  private readonly tableGenerator: TableGenerator;
  private readonly socket: SocketProtocol;

  public constructor(deps: SocketWatchSubjectsUsecase.Deps) {
    this.tableGenerator = deps.tableGenerator;
    this.socket = deps.socket;
  }

  public async execute(
    callback: WatchSubjectsUsecase.Callback,
  ): Promise<WatchSubjectsUsecase.Response> {
    try {
      const table = await this.tableGenerator.getTable();

      const unsubscribe = this.socket.watch<SubjectModel.JSON[]>(
        table,
        (subjects) => callback(subjects.map(SubjectHydrator.hydrate)),
      );

      return unsubscribe;
    } catch {
      throw new FailedError({
        metadata: { tried: 'listen subjects changes' },
      });
    }
  }
}

export namespace SocketWatchSubjectsUsecase {
  export type Deps = {
    tableGenerator: TableGenerator;
    socket: SocketProtocol;
  };
}
