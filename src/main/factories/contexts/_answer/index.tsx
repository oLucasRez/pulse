import { ReactElement } from 'react';

import { AnswerContextProvider } from '@presentation/hooks';
import { ContextProviderProps } from '@presentation/types';

import {
  makeCreateAnswerUsecase,
  makeEditAnswerUsecase,
  makeGetAnswersUsecase,
  makeWatchAnswersUsecase,
} from '@main/factories';

export function makeAnswerContextProvider(
  props: ContextProviderProps,
): ReactElement {
  const getAnswers = makeGetAnswersUsecase();
  const watchAnswers = makeWatchAnswersUsecase();
  const createAnswer = makeCreateAnswerUsecase();
  const editAnswer = makeEditAnswerUsecase();

  return (
    <AnswerContextProvider
      getAnswers={getAnswers}
      watchAnswers={watchAnswers}
      createAnswer={createAnswer}
      editAnswer={editAnswer}
      {...props}
    />
  );
}
