import { createContext, FC, useCallback, useContext } from 'react';

import {
  ICreateQuestionUsecase,
  IWatchQuestionsUsecase,
} from '@domain/usecases';

import { useSelector } from '@presentation/hooks';

import { questionsSelector } from '@main/store';

import {
  QuestionUsecasesContextProviderProps,
  QuestionUsecasesContextValue,
} from './types';

const Context = createContext({} as QuestionUsecasesContextValue);

export const useQuestionUsecases = (): QuestionUsecasesContextValue =>
  useContext(Context);

export const QuestionUsecasesContextProvider: FC<
  QuestionUsecasesContextProviderProps
> = (props) => {
  const { children } = props;

  const questions = useSelector(questionsSelector);

  const watchQuestions = useCallback(
    (callback: IWatchQuestionsUsecase.Callback = () => {}) =>
      props.watchQuestions.execute(callback),
    [],
  );

  const createQuestion = useCallback<ICreateQuestionUsecase['execute']>(
    (payload) => props.createQuestion.execute(payload),
    [],
  );

  return (
    <Context.Provider
      value={{
        questions,
        watchQuestions,
        createQuestion,
      }}
    >
      {children}
    </Context.Provider>
  );
};
