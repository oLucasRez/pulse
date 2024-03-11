import { ChangeSubjectObserver } from '@data/observers';

import { makeSubjectStoreChangeSubjectSubscriber } from '@main/factories';
import { ChangeSubjectPublisher } from '@main/observers';

export function makeChangeSubjectPublisher(): ChangeSubjectObserver.Publisher {
  const publisher = new ChangeSubjectPublisher();

  publisher.subscribe(makeSubjectStoreChangeSubjectSubscriber());

  return publisher;
}
