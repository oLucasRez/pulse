import { SubjectModel } from '@domain/models';
import { Vector } from '@domain/utils';

export interface ChangeMySubjectUsecase {
  execute(payload: ChangeMySubjectUsecase.Payload): Promise<SubjectModel>;
}

export namespace ChangeMySubjectUsecase {
  export type Payload = {
    position?: Vector;
    description?: string;
  };
}
