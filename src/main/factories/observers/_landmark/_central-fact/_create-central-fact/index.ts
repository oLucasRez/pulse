import { CreateCentralFactObserver } from '@data/observers';

import { makeCentralFactStoreCreateCentralFactSubscriber } from '@main/factories';
import { CreateCentralFactPublisher } from '@main/observers';

export function makeCreateCentralFactPublisher(): CreateCentralFactObserver.Publisher {
  const publisher = new CreateCentralFactPublisher();

  publisher.subscribe(makeCentralFactStoreCreateCentralFactSubscriber());

  return publisher;
}
