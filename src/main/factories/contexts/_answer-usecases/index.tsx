import { ReactElement } from 'react';

import { AnswerUsecasesContextProvider } from '@presentation/contexts';
import { ContextProviderProps } from '@presentation/types';

import {
  makeCreateAnswerUsecase,
  makeWatchAnswersUsecase,
} from '@main/factories';

export function makeAnswerUsecasesContextProvider(
  props: ContextProviderProps,
): ReactElement {
  const createAnswer = makeCreateAnswerUsecase();
  const watchAnswers = makeWatchAnswersUsecase();

  return (
    <AnswerUsecasesContextProvider
      watchAnswers={watchAnswers}
      createAnswer={createAnswer}
      {...props}
    />
  );
}
