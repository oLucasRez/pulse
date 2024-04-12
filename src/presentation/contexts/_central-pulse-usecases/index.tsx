import { createContext, FC, useCallback, useContext } from 'react';

import { WatchCentralPulseUsecase } from '@domain/usecases';

import { useSelector } from '@presentation/hooks';

import { centralPulseSelector } from '@main/store';

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
  const { children } = props;

  const centralPulse = useSelector(centralPulseSelector);

  const watchCentralPulse = useCallback(
    (callback?: WatchCentralPulseUsecase.Callback) =>
      props.watchCentralPulse.execute(callback ?? (() => {})),
    [],
  );

  return (
    <Context.Provider
      value={{
        centralPulse,
        watchCentralPulse,
      }}
    >
      {children}
    </Context.Provider>
  );
};
