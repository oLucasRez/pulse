import { IQuestionHydrator } from '@data/hydration';

import { makePlayerDAO } from '@main/factories';
import { QuestionHydrator } from '@main/hydration';

export function makeQuestionHydrator(): IQuestionHydrator {
  const playerDAO = makePlayerDAO();

  return new QuestionHydrator({ playerDAO });
}
