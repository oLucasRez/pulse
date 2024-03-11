import { SubjectModel } from '@domain/models';
import {
  ChangeSubjectUsecase,
  CreateMySubjectUsecase,
  CreateSubjectUsecase,
  GetMySubjectUsecase,
  WatchSubjectsUsecase,
} from '@domain/usecases';

import { ContextProviderProps } from '@presentation/types';

export type SubjectUsecasesContextValue = {
  subjects: SubjectModel[];
  mySubject: SubjectModel | null;
  watchSubjects(
    callback?: WatchSubjectsUsecase.Callback,
  ): Promise<WatchSubjectsUsecase.Response>;
  fetchMySubject: GetMySubjectUsecase['execute'];
  createMySubject: CreateMySubjectUsecase['execute'];
  createSubject: CreateSubjectUsecase['execute'];
  changeSubject: ChangeSubjectUsecase['execute'];
};

export interface SubjectUsecasesContextProviderProps
  extends ContextProviderProps {
  watchSubjects: WatchSubjectsUsecase;
  getMySubject: GetMySubjectUsecase;
  createMySubject: CreateMySubjectUsecase;
  createSubject: CreateSubjectUsecase;
  changeSubject: ChangeSubjectUsecase;
}
