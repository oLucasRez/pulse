import { createContext, FC, useContext } from 'react';

import {
  RoundUsecasesContextProviderProps,
  RoundUsecasesContextValue,
} from './types';

const Context = createContext({} as RoundUsecasesContextValue);

export const useRoundUsecases = (): RoundUsecasesContextValue =>
  useContext(Context);

export const RoundUsecasesContextProvider: FC<
  RoundUsecasesContextProviderProps
> = (props) => {
  const {
    getRound,
    createRound,
    passTurn,

    children,
  } = props;

  return (
    <Context.Provider
      value={{
        getRound,
        createRound,
        passTurn,
      }}
    >
      {children}
    </Context.Provider>
  );
};
