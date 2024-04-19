import { IAnswerHydrator } from '@data/hydration';

import { AnswerHydrator } from '@main/hydration';

export function makeAnswerHydrator(): IAnswerHydrator {
  return new AnswerHydrator();
}
