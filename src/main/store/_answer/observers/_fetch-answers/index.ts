import { AnswerModel } from '@domain/models';

import { FetchAnswersObserver } from '@data/observers';

import { store } from '@main/store';

import { fetchAnswersAction } from '../../actions';

export class AnswerStoreFetchAnswersSubscriber
  implements FetchAnswersObserver.Subscriber
{
  public onFetchAnswers(answers: AnswerModel[]): void {
    store.dispatch(fetchAnswersAction(answers));
  }
}
