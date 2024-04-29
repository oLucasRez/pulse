import { useQuery, useQueryClient } from '@tanstack/react-query';
import { createContext, FC, useContext } from 'react';

import { AnswerModel } from '@domain/models';

import { AnswerContextProviderProps, AnswerContextValue } from './types';

import { useGame } from '../_use-game';
import { useUsecase } from '../_use-usecase';
import { useWatch } from '../_use-watch';

const Context = createContext({} as AnswerContextValue);

export const useAnswer = (): AnswerContextValue => useContext(Context);

export const AnswerContextProvider: FC<AnswerContextProviderProps> = ({
  getAnswers,
  watchAnswers,
  children,
  ...props
}) => {
  const { currentGame } = useGame();

  const queryClient = useQueryClient();

  const queryKey = [currentGame?.id, 'answers'];

  const { data: answers = [] } = useQuery({
    queryKey,
    queryFn: () => getAnswers.execute(),
  });

  function replaceAll(answers: AnswerModel[]): void {
    queryClient.setQueryData<AnswerModel[]>(queryKey, () => answers);
    queryClient.invalidateQueries({ queryKey: [currentGame?.id, 'questions'] });
  }

  const createAnswer = useUsecase(props.createAnswer);

  useWatch(async () => {
    if (currentGame)
      return watchAnswers.execute((answers) => replaceAll(answers));
  }, [currentGame]);

  return (
    <Context.Provider
      value={{
        answers,
        createAnswer,
      }}
    >
      {children}
    </Context.Provider>
  );
};
