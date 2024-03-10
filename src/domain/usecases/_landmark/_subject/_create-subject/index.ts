import { Color } from '@domain/enums';
import { SubjectModel } from '@domain/models';
import { Vector } from '@domain/utils';

export interface CreateSubjectUsecase {
  execute(payload: CreateSubjectUsecase.Payload): Promise<SubjectModel>;
}

export namespace CreateSubjectUsecase {
  export type Payload = {
    position: Vector | null;
    description: string;
    color: Color;
  };
}
