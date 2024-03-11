import { SubjectModel } from '@domain/models';

import { FetchSubjectsObserver, Publisher } from '@data/observers';

export class FetchSubjectsPublisher
  extends Publisher<FetchSubjectsObserver.Subscriber>
  implements FetchSubjectsObserver.Publisher
{
  public notifyFetchSubjects(subjects: SubjectModel[]): void {
    this.subscribers.map((subscriber) => subscriber.onFetchSubjects(subjects));
  }
}
