import { QuestionModel } from '@domain/models';

import { FetchQuestionsObserver } from '@data/observers';

import { store } from '@main/store';

import { fetchQuestionsAction } from '../../actions';

export class QuestionStoreFetchQuestionsSubscriber
  implements FetchQuestionsObserver.Subscriber
{
  public onFetchQuestions(questions: QuestionModel[]): void {
    store.dispatch(fetchQuestionsAction(questions));
  }
}
