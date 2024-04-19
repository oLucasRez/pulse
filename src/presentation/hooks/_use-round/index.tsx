import { useQuery, useQueryClient } from '@tanstack/react-query';
import { createContext, FC, useContext, useMemo } from 'react';

import { RoundModel } from '@domain/models';

import { RoundContextProviderProps, RoundContextValue } from './types';

import { useGame } from '../_use-game';
import { useWatch } from '../_use-watch';

const Context = createContext({} as RoundContextValue);

export const useRound = (): RoundContextValue => useContext(Context);

export const RoundContextProvider: FC<RoundContextProviderProps> = ({
  getRounds,
  watchRounds,
  children,
}) => {
  const { currentGame } = useGame();

  const queryClient = useQueryClient();

  const queryKey = [currentGame?.id, 'rounds'];

  const { data: rounds = [] } = useQuery({
    queryKey,
    queryFn: () => getRounds.execute(),
  });

  const round = useMemo(
    () => rounds.find(({ id }) => id === currentGame?.roundID) ?? null,
    [rounds, currentGame],
  );

  const lightSpotRound = useMemo(
    () => rounds.find(({ id }) => id === currentGame?.lightSpotRoundID) ?? null,
    [rounds, currentGame],
  );

  useWatch(async () => {
    if (currentGame)
      return watchRounds.execute((rounds) =>
        queryClient.setQueryData<RoundModel[]>(queryKey, () => rounds),
      );
  }, [currentGame]);

  return (
    <Context.Provider
      value={{
        round,
        lightSpotRound,
      }}
    >
      {children}
    </Context.Provider>
  );
};
