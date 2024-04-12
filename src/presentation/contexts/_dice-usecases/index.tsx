import { createContext, FC, useCallback, useContext } from 'react';

import { RollDiceUsecase, WatchDicesUsecase } from '@domain/usecases';

import { useSelector } from '@presentation/hooks';

import { dicesSelector } from '@main/store';

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
  const { children } = props;

  const dices = useSelector(dicesSelector);

  const watchDices = useCallback(
    (callback: WatchDicesUsecase.Callback = () => {}) =>
      props.watchDices.execute(callback),
    [],
  );

  const rollDice = useCallback<RollDiceUsecase['execute']>(
    (id) => props.rollDice.execute(id),
    [],
  );

  return (
    <Context.Provider value={{ dices, watchDices, rollDice }}>
      {children}
    </Context.Provider>
  );
};
