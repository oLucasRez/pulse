import { SubjectModel } from '@domain/models';

export interface ISubjectHydrator {
  hydrate(dto: SubjectModel.DTO): Promise<SubjectModel>;
}
