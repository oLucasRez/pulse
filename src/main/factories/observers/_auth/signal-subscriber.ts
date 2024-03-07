import { AuthObserver } from '@data/observers';
import { SignalAuthSubscriber } from '@main/observers';

export function makeSignalAuthSubscriber(): AuthObserver.Subscriber {
  return new SignalAuthSubscriber();
}
