import { SubjectModel } from '@domain/models';

import { BasePublisher } from '@data/observers';

export namespace FetchSubjectsObserver {
  export interface Subscriber {
    onFetchSubjects(subjects: SubjectModel[]): void;
  }

  export interface Publisher extends BasePublisher<Subscriber> {
    notifyFetchSubjects(subjects: SubjectModel[]): void;
  }
}
