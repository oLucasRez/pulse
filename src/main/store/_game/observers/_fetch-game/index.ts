import { GameModel } from '@domain/models';

import { FetchGameObserver } from '@data/observers';

import { store } from '@main/store';

import { fetchGameAction } from '../../actions';

export class GameStoreFetchGameSubscriber
  implements FetchGameObserver.Subscriber
{
  public onFetchGame(id: string, game: GameModel | null): void {
    store.dispatch(fetchGameAction([id, game]));
  }
}
