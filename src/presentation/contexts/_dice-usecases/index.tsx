import { createContext, FC, useContext, useEffect } from 'react';

import { DiceModel } from '@domain/models';

import { WatchDicesUsecase } from '@domain/usecases';

import {
  DiceUsecasesContextProviderProps,
  DiceUsecasesContextValue,
} from './types';

import { useStates } from '@presentation/hooks';

import { logError } from '@presentation/utils';

import { useGameUsecases } from '..';

const Context = createContext({} as DiceUsecasesContextValue);

export const useDiceUsecases = (): DiceUsecasesContextValue =>
  useContext(Context);

export const DiceUsecasesContextProvider: FC<
  DiceUsecasesContextProviderProps
> = (props) => {
  const {
    watchDices,

    children,
  } = props;

  const [s, set] = useStates({ dices: [] as DiceModel[] });

  const { currentGame } = useGameUsecases();

  useEffect(() => {
    if (!currentGame?.started) return;

    let unsubscribe: WatchDicesUsecase.Response;

    watchDices
      .execute(set('dices'))
      .then((value) => (unsubscribe = value))
      .catch(logError);

    return () => unsubscribe?.();
  }, [currentGame?.started]);

  return (
    <Context.Provider value={{ dices: s.dices }}>{children}</Context.Provider>
  );
};
