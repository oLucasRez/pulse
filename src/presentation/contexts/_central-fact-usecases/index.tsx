import { createContext, FC, useContext } from 'react';

import {
  CentralFactUsecasesContextProviderProps,
  CentralFactUsecasesContextValue,
} from './types';

const Context = createContext({} as CentralFactUsecasesContextValue);

export const useCentralFactUsecases = (): CentralFactUsecasesContextValue =>
  useContext(Context);

export const CentralFactUsecasesContextProvider: FC<
  CentralFactUsecasesContextProviderProps
> = (props) => {
  const {
    getCentralFact,
    watchCentralFact,
    changeCentralFact,

    children,
  } = props;

  return (
    <Context.Provider
      value={{
        getCentralFact,
        watchCentralFact,
        changeCentralFact,
      }}
    >
      {children}
    </Context.Provider>
  );
};
