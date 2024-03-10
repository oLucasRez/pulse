import { BanPlayerObserver } from '@data/observers';

import { makePlayerStoreBanPlayerSubscriber } from '@main/factories';
import { BanPlayerPublisher } from '@main/observers';

export function makeBanPlayerPublisher(): BanPlayerObserver.Publisher {
  const publisher = new BanPlayerPublisher();

  publisher.subscribe(makePlayerStoreBanPlayerSubscriber());

  return publisher;
}
