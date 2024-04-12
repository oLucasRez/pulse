import { createContext, FC, useCallback, useContext } from 'react';

import {
  ICreateSubjectPulseUsecase,
  IWatchSubjectPulsesUsecase,
} from '@domain/usecases';

import { useSelector } from '@presentation/hooks';

import { subjectPulsesSelector } from '@main/store';

import {
  SubjectPulseUsecasesContextProviderProps,
  SubjectPulseUsecasesContextValue,
} from './types';

const Context = createContext({} as SubjectPulseUsecasesContextValue);

export const useSubjectPulseUsecases = (): SubjectPulseUsecasesContextValue =>
  useContext(Context);

export const SubjectPulseUsecasesContextProvider: FC<
  SubjectPulseUsecasesContextProviderProps
> = (props) => {
  const { children } = props;

  const subjectPulses = useSelector(subjectPulsesSelector);

  const watchSubjectPulses = useCallback(
    (callback: IWatchSubjectPulsesUsecase.Callback = () => {}) =>
      props.watchSubjectPulses.execute(callback),
    [],
  );

  const createSubjectPulse = useCallback(
    (payload: ICreateSubjectPulseUsecase.Payload) =>
      props.createSubjectPulse.execute(payload),
    [],
  );

  return (
    <Context.Provider
      value={{ subjectPulses, watchSubjectPulses, createSubjectPulse }}
    >
      {children}
    </Context.Provider>
  );
};
