import { AnswerModel } from '@domain/models';

import { FetchAnswersObserver, Publisher } from '@data/observers';

export class FetchAnswersPublisher
  extends Publisher<FetchAnswersObserver.Subscriber>
  implements FetchAnswersObserver.Publisher
{
  public notifyFetchAnswers(answers: AnswerModel[]): void {
    this.subscribers.map((subscriber) => subscriber.onFetchAnswers(answers));
  }
}
