import { ReactElement } from 'react';

import { QuestionUsecasesContextProvider } from '@presentation/contexts';
import { ContextProviderProps } from '@presentation/types';

import {
  makeCreateQuestionUsecase,
  makeWatchQuestionsUsecase,
} from '@main/factories';

export function makeQuestionUsecasesContextProvider(
  props: ContextProviderProps,
): ReactElement {
  const watchQuestions = makeWatchQuestionsUsecase();
  const createQuestion = makeCreateQuestionUsecase();

  return (
    <QuestionUsecasesContextProvider
      watchQuestions={watchQuestions}
      createQuestion={createQuestion}
      {...props}
    />
  );
}
