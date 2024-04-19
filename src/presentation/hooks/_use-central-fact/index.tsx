import { useQuery, useQueryClient } from '@tanstack/react-query';
import { createContext, FC, useContext } from 'react';

import { CentralFactModel } from '@domain/models';

import {
  CentralFactContextProviderProps,
  CentralFactContextValue,
} from './types';

import { useGame } from '../_use-game';
import { useUsecase } from '../_use-usecase';
import { useWatch } from '../_use-watch';

const Context = createContext({} as CentralFactContextValue);

export const useCentralFact = (): CentralFactContextValue =>
  useContext(Context);

export const CentralFactContextProvider: FC<
  CentralFactContextProviderProps
> = ({ getCentralFact, watchCentralFact, children, ...props }) => {
  const { currentGame } = useGame();

  const queryKey = [currentGame?.id, 'centralFact'];

  const { data: centralFact = null } = useQuery({
    queryKey,
    queryFn: () => getCentralFact.execute(),
  });

  const queryClient = useQueryClient();

  const changeCentralFact = useUsecase(props.changeCentralFact);

  useWatch(async () => {
    if (currentGame)
      return watchCentralFact.execute((centralFact) =>
        queryClient.setQueryData<CentralFactModel | null>(
          queryKey,
          () => centralFact,
        ),
      );
  }, [currentGame]);

  return (
    <Context.Provider value={{ centralFact, changeCentralFact }}>
      {children}
    </Context.Provider>
  );
};
