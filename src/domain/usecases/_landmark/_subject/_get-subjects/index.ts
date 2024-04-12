import { SubjectModel } from '@domain/models';

export interface IGetSubjectsUsecase {
  execute(): Promise<SubjectModel[]>;
}
