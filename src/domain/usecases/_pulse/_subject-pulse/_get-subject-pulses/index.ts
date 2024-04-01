import { SubjectPulseModel } from '@domain/models';

export interface GetSubjectPulsesUsecase {
  execute(): Promise<SubjectPulseModel[]>;
}
