import { RoundModel } from '@domain/models';

import { FetchRoundObserver } from '@data/observers';

import { store } from '@main/store';

import { fetchRoundAction } from '../../actions';

export class RoundStoreFetchRoundSubscriber
  implements FetchRoundObserver.Subscriber
{
  public onFetchRound(id: string, round: RoundModel | null): void {
    store.dispatch(fetchRoundAction([id, round]));
  }
}
