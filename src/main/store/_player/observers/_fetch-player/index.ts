import { PlayerModel } from '@domain/models';

import { FetchPlayerObserver } from '@data/observers';

import { store } from '@main/store';

import { fetchPlayerAction } from '../../actions';

export class PlayerStoreFetchPlayerSubscriber
  implements FetchPlayerObserver.Subscriber
{
  public onFetchPlayer(id: string, player: PlayerModel | null): void {
    store.dispatch(fetchPlayerAction([id, player]));
  }
}
