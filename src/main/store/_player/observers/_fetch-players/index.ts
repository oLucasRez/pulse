import { PlayerModel } from '@domain/models';

import { FetchPlayersObserver } from '@data/observers';

import { store } from '@main/store';

import { fetchPlayersAction } from '../../actions';

export class PlayerStoreFetchPlayersSubscriber
  implements FetchPlayersObserver.Subscriber
{
  public onFetchPlayers(players: PlayerModel[]): void {
    store.dispatch(fetchPlayersAction(players));
  }
}
