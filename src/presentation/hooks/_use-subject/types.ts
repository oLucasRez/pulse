import { SubjectModel } from '@domain/models';
import {
  IChangeMySubjectPositionUsecase,
  IChangeSubjectUsecase,
  ICreateMySubjectUsecase,
  ICreateSubjectUsecase,
  IGetSubjectsUsecase,
  IWatchSubjectsUsecase,
} from '@domain/usecases';

import { ContextProviderProps } from '@presentation/types';

export type SubjectContextValue = {
  subjects: SubjectModel[];
  mySubject: SubjectModel | null;
  createMySubject: ICreateMySubjectUsecase['execute'];
  createSubject: ICreateSubjectUsecase['execute'];
  changeSubject: IChangeSubjectUsecase['execute'];
  changeMySubjectPosition: IChangeMySubjectPositionUsecase['execute'];
};

export interface SubjectContextProviderProps extends ContextProviderProps {
  getSubjects: IGetSubjectsUsecase;
  watchSubjects: IWatchSubjectsUsecase;
  createMySubject: ICreateMySubjectUsecase;
  createSubject: ICreateSubjectUsecase;
  changeSubject: IChangeSubjectUsecase;
  changeMySubjectPosition: IChangeMySubjectPositionUsecase;
}
