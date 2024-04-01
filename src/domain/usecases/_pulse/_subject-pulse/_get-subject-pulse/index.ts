import { SubjectPulseModel } from '@domain/models';

export interface GetSubjectPulseUsecase {
  execute(id: string): Promise<SubjectPulseModel | null>;
}
