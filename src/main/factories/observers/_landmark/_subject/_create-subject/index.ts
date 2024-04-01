import { CreateSubjectObserver } from '@data/observers';

import { makeSubjectStoreCreateSubjectSubscriber } from '@main/factories';
import { CreateSubjectPublisher } from '@main/observers';

export function makeCreateSubjectPublisher(): CreateSubjectObserver.Publisher {
  const publisher = new CreateSubjectPublisher();

  publisher.subscribe(makeSubjectStoreCreateSubjectSubscriber());

  return publisher;
}
