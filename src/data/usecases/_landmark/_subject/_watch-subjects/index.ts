import { FailedError } from '@domain/errors';
import { IWatchSubjectsUsecase } from '@domain/usecases';

import { ISubjectDAO } from '@data/dao';
import { SubjectHydrator } from '@data/hydration';
import { FetchSubjectsObserver } from '@data/observers';

export class WatchSubjectsUsecase implements IWatchSubjectsUsecase {
  private readonly subjectDAO: ISubjectDAO;
  private readonly fetchSubjectsPublisher: FetchSubjectsObserver.Publisher;

  public constructor({ subjectDAO, fetchSubjectsPublisher }: Deps) {
    this.subjectDAO = subjectDAO;
    this.fetchSubjectsPublisher = fetchSubjectsPublisher;
  }

  public async execute(
    callback: IWatchSubjectsUsecase.Callback,
  ): Promise<IWatchSubjectsUsecase.Response> {
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

type Deps = {
  subjectDAO: ISubjectDAO;
  fetchSubjectsPublisher: FetchSubjectsObserver.Publisher;
};
