import { SubjectPulseModel } from '@domain/models';

export interface IGetSubjectPulsesUsecase {
  execute(): Promise<SubjectPulseModel[]>;
}
