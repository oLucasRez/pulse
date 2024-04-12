import { createContext, FC, useCallback, useContext } from 'react';

import { ICreateAnswerUsecase, IWatchAnswersUsecase } from '@domain/usecases';

import { useSelector } from '@presentation/hooks';

import { answersSelector } from '@main/store';

import {
  AnswerUsecasesContextProviderProps,
  AnswerUsecasesContextValue,
} from './types';

const Context = createContext({} as AnswerUsecasesContextValue);

export const useAnswerUsecases = (): AnswerUsecasesContextValue =>
  useContext(Context);

export const AnswerUsecasesContextProvider: FC<
  AnswerUsecasesContextProviderProps
> = (props) => {
  const { children } = props;

  const answers = useSelector(answersSelector);

  const watchAnswers = useCallback(
    (callback: IWatchAnswersUsecase.Callback = () => {}) =>
      props.watchAnswers.execute(callback),
    [],
  );

  const createAnswer = useCallback<ICreateAnswerUsecase['execute']>(
    (payload) => props.createAnswer.execute(payload),
    [],
  );

  return (
    <Context.Provider value={{ answers, watchAnswers, createAnswer }}>
      {children}
    </Context.Provider>
  );
};
