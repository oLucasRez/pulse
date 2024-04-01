import { QuestionModel } from '@domain/models';

import { FetchQuestionsObserver, Publisher } from '@data/observers';

export class FetchQuestionsPublisher
  extends Publisher<FetchQuestionsObserver.Subscriber>
  implements FetchQuestionsObserver.Publisher
{
  public notifyFetchQuestions(questions: QuestionModel[]): void {
    this.subscribers.map((subscriber) =>
      subscriber.onFetchQuestions(questions),
    );
  }
}
