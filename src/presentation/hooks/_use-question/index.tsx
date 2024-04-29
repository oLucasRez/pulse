import { useQuery, useQueryClient } from '@tanstack/react-query';
import { createContext, FC, useContext } from 'react';

import { QuestionModel } from '@domain/models';

import { QuestionContextProviderProps, QuestionContextValue } from './types';

import { useGame } from '../_use-game';
import { useUsecase } from '../_use-usecase';
import { useWatch } from '../_use-watch';

const Context = createContext({} as QuestionContextValue);

export const useQuestion = (): QuestionContextValue => useContext(Context);

export const QuestionContextProvider: FC<QuestionContextProviderProps> = ({
  getQuestions,
  watchQuestions,
  children,
  ...props
}) => {
  const { currentGame } = useGame();

  const queryClient = useQueryClient();

  const queryKey = [currentGame?.id, 'questions'];

  const { data: questions = [] } = useQuery({
    queryKey,
    queryFn: () => getQuestions.execute(),
  });

  const createQuestion = useUsecase(props.createQuestion);

  const voteQuestionFact = useUsecase(props.voteQuestionFact);

  useWatch(async () => {
    if (currentGame)
      return watchQuestions.execute((questions) =>
        queryClient.setQueryData<QuestionModel[]>(queryKey, () => questions),
      );
  }, [currentGame]);

  return (
    <Context.Provider
      value={{
        questions,
        createQuestion,
        voteQuestionFact,
      }}
    >
      {children}
    </Context.Provider>
  );
};
