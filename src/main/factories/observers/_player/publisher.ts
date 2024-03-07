import { PlayerObserver } from '@data/observers';
import { PlayerPublisher } from '@main/observers';

export function makePlayerPublisher(): PlayerObserver.Publisher {
  return new PlayerPublisher();
}
