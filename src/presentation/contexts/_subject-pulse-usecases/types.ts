import { SubjectPulseModel } from '@domain/models';
import {
  ICreateSubjectPulseUsecase,
  IWatchSubjectPulsesUsecase,
} from '@domain/usecases';

import { ContextProviderProps } from '@presentation/types';

export type SubjectPulseUsecasesContextValue = {
  subjectPulses: SubjectPulseModel[];
  watchSubjectPulses(
    callback?: IWatchSubjectPulsesUsecase.Callback,
  ): Promise<IWatchSubjectPulsesUsecase.Response>;
  createSubjectPulse: ICreateSubjectPulseUsecase['execute'];
};

export interface SubjectPulseUsecasesContextProviderProps
  extends ContextProviderProps {
  watchSubjectPulses: IWatchSubjectPulsesUsecase;
  createSubjectPulse: ICreateSubjectPulseUsecase;
}
