import { GameObserver } from '@data/observers';
import { GamePublisher } from '@main/observers';

export function makeGamePublisher(): GameObserver.Publisher {
  return new GamePublisher();
}
