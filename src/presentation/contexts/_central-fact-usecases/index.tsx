import { createContext, FC, useCallback, useContext } from 'react';

import {
  IChangeCentralFactUsecase,
  IWatchCentralFactUsecase,
} from '@domain/usecases';

import { useSelector } from '@presentation/hooks';

import { centralFactSelector } from '@main/store';

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
  const { children } = props;

  const centralFact = useSelector(centralFactSelector);

  const changeCentralFact = useCallback<IChangeCentralFactUsecase['execute']>(
    (payload) => props.changeCentralFact.execute(payload),
    [],
  );

  const watchCentralFact = useCallback(
    (callback?: IWatchCentralFactUsecase.Callback) =>
      props.watchCentralFact.execute(callback ?? (() => {})),
    [],
  );

  return (
    <Context.Provider
      value={{
        centralFact,
        changeCentralFact,
        watchCentralFact,
      }}
    >
      {children}
    </Context.Provider>
  );
};
