import { RoundModel } from '@domain/models';

import { FetchRoundsObserver } from '@data/observers';

import { store } from '@main/store';

import { fetchRoundsAction } from '../../actions';

export class RoundStoreFetchRoundsSubscriber
  implements FetchRoundsObserver.Subscriber
{
  public onFetchRounds(rounds: RoundModel[]): void {
    store.dispatch(fetchRoundsAction(rounds));
  }
}
