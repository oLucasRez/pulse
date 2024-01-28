import { createContext, FC, useContext } from 'react';

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
    getDices,
    getDice,
    watchDices,
    createDice,
    changeDice,

    children,
  } = props;

  return (
    <Context.Provider
      value={{
        getDices,
        getDice,
        watchDices,
        createDice,
        changeDice,
      }}
    >
      {children}
    </Context.Provider>
  );
};
