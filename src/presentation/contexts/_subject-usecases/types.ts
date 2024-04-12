import { SubjectModel } from '@domain/models';
import {
  IChangeMySubjectPositionUsecase,
  IChangeSubjectUsecase,
  ICreateMySubjectUsecase,
  ICreateSubjectUsecase,
  IGetMySubjectUsecase,
  IWatchSubjectsUsecase,
} from '@domain/usecases';

import { ContextProviderProps } from '@presentation/types';

export type SubjectUsecasesContextValue = {
  subjects: SubjectModel[];
  mySubject: SubjectModel | null;
  watchSubjects(
    callback?: IWatchSubjectsUsecase.Callback,
  ): Promise<IWatchSubjectsUsecase.Response>;
  fetchMySubject: IGetMySubjectUsecase['execute'];
  createMySubject: ICreateMySubjectUsecase['execute'];
  createSubject: ICreateSubjectUsecase['execute'];
  changeSubject: IChangeSubjectUsecase['execute'];
  changeMySubjectPosition: IChangeMySubjectPositionUsecase['execute'];
};

export interface SubjectUsecasesContextProviderProps
  extends ContextProviderProps {
  watchSubjects: IWatchSubjectsUsecase;
  getMySubject: IGetMySubjectUsecase;
  createMySubject: ICreateMySubjectUsecase;
  createSubject: ICreateSubjectUsecase;
  changeSubject: IChangeSubjectUsecase;
  changeMySubjectPosition: IChangeMySubjectPositionUsecase;
}
