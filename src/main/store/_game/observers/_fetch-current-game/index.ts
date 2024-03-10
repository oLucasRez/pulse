import { GameModel } from '@domain/models';

import { FetchCurrentGameObserver } from '@data/observers';

import { store } from '@main/store';

import { fetchCurrentGameAction } from '../../actions';

export class GameStoreFetchCurrentGameSubscriber
  implements FetchCurrentGameObserver.Subscriber
{
  public onFetchCurrentGame(currentGame: GameModel | null): void {
    store.dispatch(fetchCurrentGameAction(currentGame));
  }
}
