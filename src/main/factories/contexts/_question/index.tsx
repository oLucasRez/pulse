import { ReactElement } from 'react';

import { QuestionContextProvider } from '@presentation/hooks';
import { ContextProviderProps } from '@presentation/types';

import {
  makeCreateQuestionUsecase,
  makeEditQuestionUsecase,
  makeGetQuestionsUsecase,
  makeVoteQuestionFactUsecase,
  makeWatchQuestionsUsecase,
} from '@main/factories';

export function makeQuestionContextProvider(
  props: ContextProviderProps,
): ReactElement {
  const getQuestions = makeGetQuestionsUsecase();
  const watchQuestions = makeWatchQuestionsUsecase();
  const createQuestion = makeCreateQuestionUsecase();
  const editQuestion = makeEditQuestionUsecase();
  const voteQuestionFact = makeVoteQuestionFactUsecase();

  return (
    <QuestionContextProvider
      getQuestions={getQuestions}
      watchQuestions={watchQuestions}
      createQuestion={createQuestion}
      editQuestion={editQuestion}
      voteQuestionFact={voteQuestionFact}
      {...props}
    />
  );
}
