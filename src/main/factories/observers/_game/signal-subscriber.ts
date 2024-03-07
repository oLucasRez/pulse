import { GameObserver } from '@data/observers';
import { SignalGameSubscriber } from '@main/observers';

export function makeSignalGameSubscriber(): GameObserver.Subscriber {
  return new SignalGameSubscriber();
}
