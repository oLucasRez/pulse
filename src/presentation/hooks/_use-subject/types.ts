import { SubjectModel } from '@domain/models';
import {
  IChangeMySubjectPositionUsecase,
  ICreateLightSpotSubjectUsecase,
  ICreateMySubjectUsecase,
  ICreateSubjectUsecase,
  IEditSubjectUsecase,
  IGetSubjectsUsecase,
  IWatchSubjectsUsecase,
} from '@domain/usecases';

import { ContextProviderProps } from '@presentation/types';

export type SubjectContextValue = {
  subjects: SubjectModel[];
  mySubject: SubjectModel | null;
  createMySubject: ICreateMySubjectUsecase['execute'];
  createLightSpotSubject: ICreateLightSpotSubjectUsecase['execute'];
  createSubject: ICreateSubjectUsecase['execute'];
  editSubject: IEditSubjectUsecase['execute'];
  changeMySubjectPosition: IChangeMySubjectPositionUsecase['execute'];
};

export interface SubjectContextProviderProps extends ContextProviderProps {
  getSubjects: IGetSubjectsUsecase;
  watchSubjects: IWatchSubjectsUsecase;
  createMySubject: ICreateMySubjectUsecase;
  createSubject: ICreateSubjectUsecase;
  createLightSpotSubject: ICreateLightSpotSubjectUsecase;
  editSubject: IEditSubjectUsecase;
  changeMySubjectPosition: IChangeMySubjectPositionUsecase;
}
