import { QuestionModel } from '@domain/models';

import { CreateQuestionObserver, Publisher } from '@data/observers';

export class CreateQuestionPublisher
  extends Publisher<CreateQuestionObserver.Subscriber>
  implements CreateQuestionObserver.Publisher
{
  public notifyCreateQuestion(question: QuestionModel): void {
    this.subscribers.map((subscriber) => subscriber.onCreateQuestion(question));
  }
}
