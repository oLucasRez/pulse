import { SubjectModel } from '@domain/models';
import { Vector } from '@domain/utils';

export interface IChangeMySubjectPositionUsecase {
  execute(position: Vector): Promise<SubjectModel>;
}
