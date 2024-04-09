import { FailedError } from '@domain/errors';
import { WatchSubjectsUsecase } from '@domain/usecases';

import { ISubjectDAO } from '@data/dao';
import { SubjectHydrator } from '@data/hydration';
import { FetchSubjectsObserver } from '@data/observers';

export class DAOWatchSubjectsUsecase implements WatchSubjectsUsecase {
  private readonly subjectDAO: ISubjectDAO;
  private readonly fetchSubjectsPublisher: FetchSubjectsObserver.Publisher;

  public constructor(deps: DAOWatchSubjectsUsecase.Deps) {
    this.subjectDAO = deps.subjectDAO;
    this.fetchSubjectsPublisher = deps.fetchSubjectsPublisher;
  }

  public async execute(
    callback: WatchSubjectsUsecase.Callback,
  ): Promise<WatchSubjectsUsecase.Response> {
    try {
      const unsubscribe = this.subjectDAO.watch((dtos) => {
        const subjects = dtos.map(SubjectHydrator.hydrate);

        this.fetchSubjectsPublisher.notifyFetchSubjects(subjects);

        callback(subjects);
      });

      return unsubscribe;
    } catch {
      throw new FailedError({
        metadata: { tried: 'listen subjects changes' },
      });
    }
  }
}

export namespace DAOWatchSubjectsUsecase {
  export type Deps = {
    subjectDAO: ISubjectDAO;
    fetchSubjectsPublisher: FetchSubjectsObserver.Publisher;
  };
}
