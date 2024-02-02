import { createContext, FC, useContext } from 'react';

import {
  CentralPulseUsecasesContextProviderProps,
  CentralPulseUsecasesContextValue,
} from './types';

const Context = createContext({} as CentralPulseUsecasesContextValue);

export const useCentralPulseUsecases = (): CentralPulseUsecasesContextValue =>
  useContext(Context);

export const CentralPulseUsecasesContextProvider: FC<
  CentralPulseUsecasesContextProviderProps
> = (props) => {
  const {
    getCentralPulse,
    watchCentralPulse,
    changeCentralPulse,

    children,
  } = props;

  return (
    <Context.Provider
      value={{
        getCentralPulse,
        watchCentralPulse,
        changeCentralPulse,
      }}
    >
      {children}
    </Context.Provider>
  );
};
