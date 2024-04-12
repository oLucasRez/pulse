import { SubjectModel } from '@domain/models';
import {
  CreateMySubjectUsecase,
  CreateSubjectUsecase,
  GetMySubjectUsecase,
  IChangeMySubjectPositionUsecase,
  IChangeSubjectUsecase,
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
  changeSubject: IChangeSubjectUsecase['execute'];
  changeMySubjectPosition: IChangeMySubjectPositionUsecase['execute'];
};

export interface SubjectUsecasesContextProviderProps
  extends ContextProviderProps {
  watchSubjects: WatchSubjectsUsecase;
  getMySubject: GetMySubjectUsecase;
  createMySubject: CreateMySubjectUsecase;
  createSubject: CreateSubjectUsecase;
  changeSubject: IChangeSubjectUsecase;
  changeMySubjectPosition: IChangeMySubjectPositionUsecase;
}
