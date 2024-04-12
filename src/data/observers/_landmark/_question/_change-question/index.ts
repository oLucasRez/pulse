import { QuestionModel } from '@domain/models';

import { BasePublisher } from '@data/observers';

export namespace ChangeQuestionObserver {
  export interface Subscriber {
    onChangeQuestion(question: QuestionModel): void;
  }

  export interface Publisher extends BasePublisher<Subscriber> {
    notifyChangeQuestion(question: QuestionModel): void;
  }
}
