import { ReactElement } from 'react';

import { AnswerContextProvider } from '@presentation/hooks';
import { ContextProviderProps } from '@presentation/types';

import {
  makeCreateAnswerUsecase,
  makeGetAnswersUsecase,
  makeVoteAnswerUsecase,
  makeWatchAnswersUsecase,
} from '@main/factories';

export function makeAnswerContextProvider(
  props: ContextProviderProps,
): ReactElement {
  const getAnswers = makeGetAnswersUsecase();
  const watchAnswers = makeWatchAnswersUsecase();
  const createAnswer = makeCreateAnswerUsecase();
  const voteAnswer = makeVoteAnswerUsecase();

  return (
    <AnswerContextProvider
      getAnswers={getAnswers}
      watchAnswers={watchAnswers}
      createAnswer={createAnswer}
      voteAnswer={voteAnswer}
      {...props}
    />
  );
}
