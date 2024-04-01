import { SubjectPulseModel } from '@domain/models';

import { FetchSubjectPulsesObserver, Publisher } from '@data/observers';

export class FetchSubjectPulsesPublisher
  extends Publisher<FetchSubjectPulsesObserver.Subscriber>
  implements FetchSubjectPulsesObserver.Publisher
{
  public notifyFetchSubjectPulses(subjectPulses: SubjectPulseModel[]): void {
    this.subscribers.map((subscriber) =>
      subscriber.onFetchSubjectPulses(subjectPulses),
    );
  }
}
