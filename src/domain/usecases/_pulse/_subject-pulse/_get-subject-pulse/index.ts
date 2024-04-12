import { SubjectPulseModel } from '@domain/models';

export interface IGetSubjectPulseUsecase {
  execute(id: string): Promise<SubjectPulseModel | null>;
}
