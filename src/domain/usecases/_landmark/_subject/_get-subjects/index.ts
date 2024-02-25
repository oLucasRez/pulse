import { SubjectModel } from '@domain/models';

export interface GetSubjectsUsecase {
  execute(): Promise<SubjectModel[]>;
}
