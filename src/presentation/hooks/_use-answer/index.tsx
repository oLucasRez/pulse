import { useQuery, useQueryClient } from '@tanstack/react-query';
import { createContext, FC, useContext, useMemo } from 'react';

import { AnswerModel } from '@domain/models';

import { AnswerContextProviderProps, AnswerContextValue } from './types';

import { useGame } from '../_use-game';
import { usePlayer } from '../_use-player';
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
  const { myPlayer } = usePlayer();

  const queryClient = useQueryClient();

  const queryKey = [currentGame?.id, 'answers'];

  const { data: answers = [] } = useQuery({
    queryKey,
    queryFn: () => getAnswers.execute(),
  });

  const votingAnswer = useMemo(
    () => answers.find(({ id }) => id === currentGame?.votingAnswerID) ?? null,
    [answers, currentGame],
  );

  const pendingMyVote = useMemo(
    () => !!myPlayer && !!votingAnswer && !(myPlayer.id in votingAnswer.votes),
    [myPlayer, votingAnswer],
  );

  const createAnswer = useUsecase(props.createAnswer);

  const voteAnswer = useUsecase(props.voteAnswer);

  useWatch(async () => {
    if (currentGame)
      return watchAnswers.execute((answers) =>
        queryClient.setQueryData<AnswerModel[]>(queryKey, () => answers),
      );
  }, [currentGame]);

  return (
    <Context.Provider
      value={{
        answers,
        votingAnswer,
        pendingMyVote,
        createAnswer,
        voteAnswer,
      }}
    >
      {children}
    </Context.Provider>
  );
};
