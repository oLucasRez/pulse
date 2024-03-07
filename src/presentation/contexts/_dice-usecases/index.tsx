import { createContext, FC, useContext, useEffect } from 'react';

import { DiceModel } from '@domain/models';

import { WatchDicesUsecase } from '@domain/usecases';

import { gameSignals } from '@presentation/signals';

import { useStates } from '@presentation/hooks';

import { logError } from '@presentation/utils';

import {
  DiceUsecasesContextProviderProps,
  DiceUsecasesContextValue,
} from './types';

const Context = createContext({} as DiceUsecasesContextValue);

export const useDiceUsecases = (): DiceUsecasesContextValue =>
  useContext(Context);

const { currentGame } = gameSignals;

export const DiceUsecasesContextProvider: FC<
  DiceUsecasesContextProviderProps
> = (props) => {
  const {
    watchDices,

    children,
  } = props;

  const [s, set] = useStates({ dices: [] as DiceModel[] });

  useEffect(() => {
    if (!currentGame.value?.started) return;

    let unsubscribe: WatchDicesUsecase.Response;

    watchDices
      .execute(set('dices'))
      .then((value) => (unsubscribe = value))
      .catch(logError);

    return () => unsubscribe?.();
  }, [currentGame.value?.started]);

  return (
    <Context.Provider value={{ dices: s.dices }}>{children}</Context.Provider>
  );
};
