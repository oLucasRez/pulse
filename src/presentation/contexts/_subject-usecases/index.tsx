import { createContext, FC, useCallback, useContext } from 'react';

import {
  ChangeMySubjectUsecase,
  ChangeSubjectUsecase,
  CreateSubjectUsecase,
  GetMySubjectUsecase,
  WatchSubjectsUsecase,
} from '@domain/usecases';

import { useSelector } from '@presentation/hooks';

import { mySubjectSelector, subjectsSelector } from '@main/store';

import {
  SubjectUsecasesContextProviderProps,
  SubjectUsecasesContextValue,
} from './types';

const Context = createContext({} as SubjectUsecasesContextValue);

export const useSubjectUsecases = (): SubjectUsecasesContextValue =>
  useContext(Context);

export const SubjectUsecasesContextProvider: FC<
  SubjectUsecasesContextProviderProps
> = (props) => {
  const { children } = props;

  const subjects = useSelector(subjectsSelector);
  const mySubject = useSelector(mySubjectSelector);

  const watchSubjects = useCallback(
    (callback: WatchSubjectsUsecase.Callback = () => {}) =>
      props.watchSubjects.execute(callback),
    [],
  );

  const fetchMySubject = useCallback<GetMySubjectUsecase['execute']>(
    () => props.getMySubject.execute(),
    [],
  );

  const createMySubject = useCallback<CreateSubjectUsecase['execute']>(
    (payload) => props.createMySubject.execute(payload),
    [],
  );

  const createSubject = useCallback<CreateSubjectUsecase['execute']>(
    (payload) => props.createSubject.execute(payload),
    [],
  );

  const changeMySubject = useCallback<ChangeMySubjectUsecase['execute']>(
    (payload) => props.changeMySubject.execute(payload),
    [],
  );

  const changeSubject = useCallback<ChangeSubjectUsecase['execute']>(
    (id, payload) => props.changeSubject.execute(id, payload),
    [],
  );

  return (
    <Context.Provider
      value={{
        subjects,
        mySubject,
        watchSubjects,
        fetchMySubject,
        createMySubject,
        createSubject,
        changeMySubject,
        changeSubject,
      }}
    >
      {children}
    </Context.Provider>
  );
};
