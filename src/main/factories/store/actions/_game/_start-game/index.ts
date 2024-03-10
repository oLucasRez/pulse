import { StartGameObserver } from '@data/observers';

import { GameStoreStartGameSubscriber } from '@main/store';

export function makeGameStoreStartGameSubscriber(): StartGameObserver.Subscriber {
  return new GameStoreStartGameSubscriber();
}
