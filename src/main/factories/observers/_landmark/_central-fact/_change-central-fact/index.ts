import { ChangeCentralFactObserver } from '@data/observers';

import { makeCentralFactStoreChangeCentralFactSubscriber } from '@main/factories';
import { ChangeCentralFactPublisher } from '@main/observers';

export function makeChangeCentralFactPublisher(): ChangeCentralFactObserver.Publisher {
  const publisher = new ChangeCentralFactPublisher();

  publisher.subscribe(makeCentralFactStoreChangeCentralFactSubscriber());

  return publisher;
}
