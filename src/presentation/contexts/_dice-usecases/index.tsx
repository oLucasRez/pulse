import { createContext, FC, useCallback, useContext } from 'react';

import { RollDiceUsecase, WatchDicesUsecase } from '@domain/usecases';
import { Vector } from '@domain/utils';

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
    (callback: WatchDicesUsecase.Callback = (): any => {}) =>
      props.watchDices.execute(callback),
    [],
  );

  const rollDice = useCallback<RollDiceUsecase['execute']>(
    (id: string, position?: Vector | undefined) =>
      props.rollDice.execute(id, position),
    [],
  );

  const setDicePosition = useCallback(
    (id: string, position: Vector | null) =>
      props.changeDice.execute(id, { position }),
    [],
  );

  return (
    <Context.Provider value={{ dices, watchDices, rollDice, setDicePosition }}>
      {children}
    </Context.Provider>
  );
};
