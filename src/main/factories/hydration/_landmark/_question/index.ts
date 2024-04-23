import { IQuestionHydrator } from '@data/hydration';

import { makeAnswerDAO, makePlayerDAO } from '@main/factories';
import { QuestionHydrator } from '@main/hydration';

export function makeQuestionHydrator(): IQuestionHydrator {
  const answerDAO = makeAnswerDAO();
  const playerDAO = makePlayerDAO();

  return new QuestionHydrator({ answerDAO, playerDAO });
}
