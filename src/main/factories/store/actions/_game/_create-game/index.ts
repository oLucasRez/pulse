import { CreateGameObserver } from '@data/observers';

import { GameStoreCreateGameSubscriber } from '@main/store';

export function makeGameStoreCreateGameSubscriber(): CreateGameObserver.Subscriber {
  return new GameStoreCreateGameSubscriber();
}
