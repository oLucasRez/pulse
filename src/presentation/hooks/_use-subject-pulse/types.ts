import { SubjectPulseModel } from '@domain/models';
import {
  ICreateSubjectPulseUsecase,
  IGetSubjectPulsesUsecase,
  IWatchSubjectPulsesUsecase,
} from '@domain/usecases';

import { ContextProviderProps } from '@presentation/types';

export type SubjectPulseContextValue = {
  subjectPulses: SubjectPulseModel[];
  createSubjectPulse: ICreateSubjectPulseUsecase['execute'];
};

export interface SubjectPulseContextProviderProps extends ContextProviderProps {
  getSubjectPulses: IGetSubjectPulsesUsecase;
  watchSubjectPulses: IWatchSubjectPulsesUsecase;
  createSubjectPulse: ICreateSubjectPulseUsecase;
}
