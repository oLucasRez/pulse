import { PlayerModel } from '@domain/models';

import { PlayerObserver } from '@data/observers';

import { store } from '..';
import {
  banPlayerAction,
  changePlayerAction,
  createPlayerAction,
  deletePlayerAction,
  fetchPlayerAction,
  fetchPlayersAction,
} from './actions';

export class StorePlayerSubscriber implements PlayerObserver.Subscriber {
  public onFetchPlayers(players: PlayerModel[]): void {
    store.dispatch(fetchPlayersAction(players));
  }

  public onFetchPlayer(id: string, player: PlayerModel | null): void {
    store.dispatch(fetchPlayerAction([id, player]));
  }

  public onCreatePlayer(player: PlayerModel): void {
    store.dispatch(createPlayerAction(player));
  }

  public onChangePlayer(player: PlayerModel): void {
    store.dispatch(changePlayerAction(player));
  }

  public onDeletePlayer(id: string): void {
    store.dispatch(deletePlayerAction(id));
  }

  public onBanPlayer(player: PlayerModel): void {
    store.dispatch(banPlayerAction(player));
  }
}

export * from './actions';
export * from './selectors';
export * from './slice';
