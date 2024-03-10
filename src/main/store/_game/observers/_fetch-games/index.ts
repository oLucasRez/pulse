import { GameModel } from '@domain/models';

import { FetchGamesObserver } from '@data/observers';

import { store } from '@main/store';

import { fetchGamesAction } from '../../actions';

export class GameStoreFetchGamesSubscriber
  implements FetchGamesObserver.Subscriber
{
  public onFetchGames(games: GameModel[]): void {
    store.dispatch(fetchGamesAction(games));
  }
}
