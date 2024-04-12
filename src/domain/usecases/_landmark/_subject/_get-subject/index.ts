import { SubjectModel } from '@domain/models';

export interface IGetSubjectUsecase {
  execute(id: string): Promise<SubjectModel | null>;
}
