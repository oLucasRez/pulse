import { SubjectModel } from '@domain/models';

import { Vector } from '@domain/utils';

export interface ChangeSubjectUsecase {
  execute(
    id: string,
    payload: ChangeSubjectUsecase.Payload,
  ): Promise<SubjectModel>;
}

export namespace ChangeSubjectUsecase {
  export type Payload = {
    position: Vector;
    description: string;
  };
}
