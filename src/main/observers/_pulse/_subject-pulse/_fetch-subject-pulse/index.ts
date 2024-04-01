import { SubjectPulseModel } from '@domain/models';

import { FetchSubjectPulseObserver, Publisher } from '@data/observers';

export class FetchSubjectPulsePublisher
  extends Publisher<FetchSubjectPulseObserver.Subscriber>
  implements FetchSubjectPulseObserver.Publisher
{
  public notifyFetchSubjectPulse(
    id: string,
    subjectPulse: SubjectPulseModel | null,
  ): void {
    this.subscribers.map((subscriber) =>
      subscriber.onFetchSubjectPulse(id, subjectPulse),
    );
  }
}
