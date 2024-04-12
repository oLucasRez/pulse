import { createContext, FC, useCallback, useContext } from 'react';

import {
  CreateSubjectUsecase,
  GetMySubjectUsecase,
  IChangeMySubjectPositionUsecase,
  IChangeSubjectUsecase,
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

  const changeSubject = useCallback<IChangeSubjectUsecase['execute']>(
    (id, payload) => props.changeSubject.execute(id, payload),
    [],
  );

  const changeMySubjectPosition = useCallback<
    IChangeMySubjectPositionUsecase['execute']
  >((position) => props.changeMySubjectPosition.execute(position), []);

  return (
    <Context.Provider
      value={{
        subjects,
        mySubject,
        watchSubjects,
        fetchMySubject,
        createMySubject,
        createSubject,
        changeSubject,
        changeMySubjectPosition,
      }}
    >
      {children}
    </Context.Provider>
  );
};
