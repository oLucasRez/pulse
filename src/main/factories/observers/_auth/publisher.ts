import { AuthObserver } from '@data/observers';
import { AuthPublisher } from '@main/observers';

export function makeAuthPublisher(): AuthObserver.Publisher {
  return new AuthPublisher();
}
