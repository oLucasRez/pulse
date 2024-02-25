import { SubjectModel } from '@domain/models';

export interface GetSubjectUsecase {
  execute(id: string): Promise<SubjectModel | null>;
}
