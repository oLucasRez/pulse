import { QuestionModel } from '@domain/models';

import { BasePublisher } from '@data/observers';

export namespace FetchQuestionsObserver {
  export interface Subscriber {
    onFetchQuestions(questions: QuestionModel[]): void;
  }

  export interface Publisher extends BasePublisher<Subscriber> {
    notifyFetchQuestions(questions: QuestionModel[]): void;
  }
}
