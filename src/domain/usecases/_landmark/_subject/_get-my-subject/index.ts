import { SubjectModel } from '@domain/models';

export interface GetMySubjectUsecase {
  execute(): Promise<SubjectModel | null>;
}
