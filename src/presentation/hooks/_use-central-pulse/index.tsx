import { useQuery, useQueryClient } from '@tanstack/react-query';
import { createContext, FC, useContext } from 'react';

import { CentralPulseModel } from '@domain/models';

import {
  CentralPulseContextProviderProps,
  CentralPulseContextValue,
} from './types';

import { useGame } from '../_use-game';
import { useWatch } from '../_use-watch';

const Context = createContext({} as CentralPulseContextValue);

export const useCentralPulse = (): CentralPulseContextValue =>
  useContext(Context);

export const CentralPulseContextProvider: FC<
  CentralPulseContextProviderProps
> = ({ getCentralPulse, watchCentralPulse, children }) => {
  const { currentGame } = useGame();

  const queryKey = [currentGame?.id, 'centralPulse'];

  const { data: centralPulse = null } = useQuery({
    queryKey,
    queryFn: () => getCentralPulse.execute(),
  });

  const queryClient = useQueryClient();

  useWatch(async () => {
    if (currentGame)
      return watchCentralPulse.execute((centralPulse) =>
        queryClient.setQueryData<CentralPulseModel | null>(
          queryKey,
          () => centralPulse,
        ),
      );
  }, [currentGame]);

  return (
    <Context.Provider value={{ centralPulse }}>{children}</Context.Provider>
  );
};
