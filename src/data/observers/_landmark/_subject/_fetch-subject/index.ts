import { SubjectModel } from '@domain/models';

import { BasePublisher } from '@data/observers';

export namespace FetchSubjectObserver {
  export interface Subscriber {
    onFetchSubject(id: string, subject: SubjectModel | null): void;
  }

  export interface Publisher extends BasePublisher<Subscriber> {
    notifyFetchSubject(id: string, subject: SubjectModel | null): void;
  }
}
