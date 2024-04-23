import { IAnswerHydrator } from '@data/hydration';

import { makePlayerDAO } from '@main/factories/dao';
import { AnswerHydrator } from '@main/hydration';

export function makeAnswerHydrator(): IAnswerHydrator {
  const playerDAO = makePlayerDAO();

  return new AnswerHydrator({ playerDAO });
}
