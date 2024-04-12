import { ReactElement } from 'react';

import { SubjectUsecasesContextProvider } from '@presentation/contexts';
import { ContextProviderProps } from '@presentation/types';

import {
  makeChangeMySubjectPositionUsecase,
  makeChangeSubjectUsecase,
  makeCreateMySubjectUsecase,
  makeCreateSubjectUsecase,
  makeGetMySubjectUsecase,
  makeWatchSubjectsUsecase,
} from '@main/factories';

export function makeSubjectUsecasesContextProvider(
  props: ContextProviderProps,
): ReactElement {
  const watchSubjects = makeWatchSubjectsUsecase();
  const getMySubject = makeGetMySubjectUsecase();
  const createMySubject = makeCreateMySubjectUsecase();
  const createSubject = makeCreateSubjectUsecase();
  const changeMySubjectPosition = makeChangeMySubjectPositionUsecase();
  const changeSubject = makeChangeSubjectUsecase();

  return (
    <SubjectUsecasesContextProvider
      watchSubjects={watchSubjects}
      getMySubject={getMySubject}
      createMySubject={createMySubject}
      createSubject={createSubject}
      changeMySubjectPosition={changeMySubjectPosition}
      changeSubject={changeSubject}
      {...props}
    />
  );
}
