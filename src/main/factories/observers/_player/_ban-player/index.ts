import { BanPlayerObserver } from '@data/observers';
import { BanPlayerPublisher } from '@main/observers';

import { makePlayerStoreBanPlayerSubscriber } from '@main/factories';

export function makeBanPlayerPublisher(): BanPlayerObserver.Publisher {
  const publisher = new BanPlayerPublisher();

  publisher.subscribe(makePlayerStoreBanPlayerSubscriber());

  return publisher;
}
