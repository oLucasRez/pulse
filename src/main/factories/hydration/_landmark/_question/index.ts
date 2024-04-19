import { IQuestionHydrator } from '@data/hydration';

import { QuestionHydrator } from '@main/hydration';

export function makeQuestionHydrator(): IQuestionHydrator {
  return new QuestionHydrator();
}
