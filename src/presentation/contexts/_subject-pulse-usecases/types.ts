import { SubjectPulseModel } from '@domain/models';
import {
  CreateSubjectPulseUsecase,
  WatchSubjectPulsesUsecase,
} from '@domain/usecases';

import { ContextProviderProps } from '@presentation/types';

export type SubjectPulseUsecasesContextValue = {
  subjectPulses: SubjectPulseModel[];
  watchSubjectPulses(
    callback?: WatchSubjectPulsesUsecase.Callback,
  ): Promise<WatchSubjectPulsesUsecase.Response>;
  createSubjectPulse: CreateSubjectPulseUsecase['execute'];
};

export interface SubjectPulseUsecasesContextProviderProps
  extends ContextProviderProps {
  watchSubjectPulses: WatchSubjectPulsesUsecase;
  createSubjectPulse: CreateSubjectPulseUsecase;
}
