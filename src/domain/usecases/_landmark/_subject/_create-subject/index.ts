import { Color } from '@domain/enums';
import { SubjectModel } from '@domain/models';
import { Vector } from '@domain/utils';

export interface ICreateSubjectUsecase {
  execute(payload: ICreateSubjectUsecase.Payload): Promise<SubjectModel>;
}

export namespace ICreateSubjectUsecase {
  export type Payload = {
    position: Vector | null;
    description: string;
    color: Color;
    icon: string;
  };
}
