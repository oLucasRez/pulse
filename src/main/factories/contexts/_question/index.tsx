import { ReactElement } from 'react';

import { QuestionContextProvider } from '@presentation/hooks';
import { ContextProviderProps } from '@presentation/types';

import {
  makeCreateQuestionUsecase,
  makeGetQuestionsUsecase,
  makeWatchQuestionsUsecase,
} from '@main/factories';

export function makeQuestionContextProvider(
  props: ContextProviderProps,
): ReactElement {
  const getQuestions = makeGetQuestionsUsecase();
  const watchQuestions = makeWatchQuestionsUsecase();
  const createQuestion = makeCreateQuestionUsecase();

  return (
    <QuestionContextProvider
      getQuestions={getQuestions}
      watchQuestions={watchQuestions}
      createQuestion={createQuestion}
      {...props}
    />
  );
}
