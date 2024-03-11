import { SubjectModel } from '@domain/models';

import { FetchSubjectObserver, Publisher } from '@data/observers';

export class FetchSubjectPublisher
  extends Publisher<FetchSubjectObserver.Subscriber>
  implements FetchSubjectObserver.Publisher
{
  public notifyFetchSubject(id: string, subject: SubjectModel | null): void {
    this.subscribers.map((subscriber) =>
      subscriber.onFetchSubject(id, subject),
    );
  }
}
