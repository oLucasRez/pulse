import { QuestionModel } from '@domain/models';

import { ChangeQuestionObserver, Publisher } from '@data/observers';

export class ChangeQuestionPublisher
  extends Publisher<ChangeQuestionObserver.Subscriber>
  implements ChangeQuestionObserver.Publisher
{
  public notifyChangeQuestion(question: QuestionModel): void {
    this.subscribers.map((subscriber) => subscriber.onChangeQuestion(question));
  }
}
