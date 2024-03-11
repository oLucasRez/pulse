import { FailedError } from '@domain/errors';
import { WatchSubjectsUsecase } from '@domain/usecases';

import { SubjectDAO } from '@data/dao';
import { SubjectHydrator } from '@data/hydration';
import { FetchSubjectsObserver } from '@data/observers';
import { SocketProtocol, TableGenerator } from '@data/protocols';

export class SocketWatchSubjectsUsecase implements WatchSubjectsUsecase {
  private readonly tableGenerator: TableGenerator;
  private readonly socket: SocketProtocol;
  private readonly fetchSubjectsPublisher: FetchSubjectsObserver.Publisher;

  public constructor(deps: SocketWatchSubjectsUsecase.Deps) {
    this.tableGenerator = deps.tableGenerator;
    this.socket = deps.socket;
    this.fetchSubjectsPublisher = deps.fetchSubjectsPublisher;
  }

  public async execute(
    callback: WatchSubjectsUsecase.Callback,
  ): Promise<WatchSubjectsUsecase.Response> {
    try {
      const table = await this.tableGenerator.getTable();

      const unsubscribe = this.socket.watch<SubjectDAO.DTO>(
        table,
        (snapshot) => {
          const subjects = snapshot.map(SubjectHydrator.hydrate);

          this.fetchSubjectsPublisher.notifyFetchSubjects(subjects);

          callback(subjects);
        },
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
    fetchSubjectsPublisher: FetchSubjectsObserver.Publisher;
  };
}
