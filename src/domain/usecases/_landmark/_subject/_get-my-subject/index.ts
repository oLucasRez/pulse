import { SubjectModel } from '@domain/models';

export interface IGetMySubjectUsecase {
  execute(): Promise<SubjectModel | null>;
}
