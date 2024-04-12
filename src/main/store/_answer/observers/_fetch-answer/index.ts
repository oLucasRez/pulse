import { AnswerModel } from '@domain/models';

import { FetchAnswerObserver } from '@data/observers';

import { store } from '@main/store';

import { fetchAnswerAction } from '../../actions';

export class AnswerStoreFetchAnswerSubscriber
  implements FetchAnswerObserver.Subscriber
{
  public onFetchAnswer(id: string, answer: AnswerModel | null): void {
    store.dispatch(fetchAnswerAction([id, answer]));
  }
}
