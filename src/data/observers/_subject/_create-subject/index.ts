import { SubjectModel } from '@domain/models';

import { BasePublisher } from '@data/observers';

export namespace CreateSubjectObserver {
  export interface Subscriber {
    onCreateSubject(subject: SubjectModel): void;
  }

  export interface Publisher extends BasePublisher<Subscriber> {
    notifyCreateSubject(subject: SubjectModel): void;
  }
}
