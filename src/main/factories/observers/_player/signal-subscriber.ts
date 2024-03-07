import { PlayerObserver } from '@data/observers';
import { SignalPlayerSubscriber } from '@main/observers';

export function makeSignalPlayerSubscriber(): PlayerObserver.Subscriber {
  return new SignalPlayerSubscriber();
}
