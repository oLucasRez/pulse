import { createContext, FC, useContext } from 'react';

import { DiceModel } from '@domain/models';

import { useStates } from '@presentation/hooks';

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

  const [s] = useStates({ dices: [] as DiceModel[] });

  return (
    <Context.Provider value={{ dices: s.dices }}>{children}</Context.Provider>
  );
};
