import { createContext, FC, useContext, useEffect } from 'react';

import { DiceModel } from '@domain/models';
import { WatchDicesUsecase } from '@domain/usecases';

import { useSelector, useStates } from '@presentation/hooks';
import { logError } from '@presentation/utils';

import {
  DiceUsecasesContextProviderProps,
  DiceUsecasesContextValue,
} from './types';

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

  const currentGame = useSelector(
    ({ auth, game }) =>
      game.games.find((game) => game.id === auth.me?.currentGameID) ?? null,
  );

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
