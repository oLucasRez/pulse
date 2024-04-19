import { ReactElement } from 'react';

import { SubjectContextProvider } from '@presentation/hooks';
import { ContextProviderProps } from '@presentation/types';

import {
  makeChangeMySubjectPositionUsecase,
  makeChangeSubjectUsecase,
  makeCreateMySubjectUsecase,
  makeCreateSubjectUsecase,
  makeGetSubjectsUsecase,
  makeWatchSubjectsUsecase,
} from '@main/factories';

export function makeSubjectContextProvider(
  props: ContextProviderProps,
): ReactElement {
  const getSubjects = makeGetSubjectsUsecase();
  const watchSubjects = makeWatchSubjectsUsecase();
  const createMySubject = makeCreateMySubjectUsecase();
  const createSubject = makeCreateSubjectUsecase();
  const changeMySubjectPosition = makeChangeMySubjectPositionUsecase();
  const changeSubject = makeChangeSubjectUsecase();

  return (
    <SubjectContextProvider
      getSubjects={getSubjects}
      watchSubjects={watchSubjects}
      createMySubject={createMySubject}
      createSubject={createSubject}
      changeMySubjectPosition={changeMySubjectPosition}
      changeSubject={changeSubject}
      {...props}
    />
  );
}
