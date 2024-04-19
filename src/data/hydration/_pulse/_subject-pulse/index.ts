import { SubjectPulseModel } from '@domain/models';

export interface ISubjectPulseHydrator {
  hydrate(dto: SubjectPulseModel.DTO): Promise<SubjectPulseModel>;
}
