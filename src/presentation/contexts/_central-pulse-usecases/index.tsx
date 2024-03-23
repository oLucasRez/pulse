import { createContext, FC, useCallback, useContext } from 'react';

import {
  ChangeCentralPulseUsecase,
  WatchCentralPulseUsecase,
} from '@domain/usecases';

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

  const changeCentralPulse = useCallback<ChangeCentralPulseUsecase['execute']>(
    (payload) => props.changeCentralPulse.execute(payload),
    [],
  );

  const watchCentralPulse = useCallback(
    (callback?: WatchCentralPulseUsecase.Callback) =>
      props.watchCentralPulse.execute(callback ?? ((): any => {})),
    [],
  );

  return (
    <Context.Provider
      value={{
        centralPulse,
        watchCentralPulse,
        changeCentralPulse,
      }}
    >
      {children}
    </Context.Provider>
  );
};
