import { Color } from '@domain/enums';
import { SubjectModel } from '@domain/models';

export interface IEditSubjectUsecase {
  execute(
    id: string,
    payload: IEditSubjectUsecase.Payload,
  ): Promise<SubjectModel>;
}

export namespace IEditSubjectUsecase {
  export type Payload = {
    icon?: string;
    description?: string;
    color?: Color;
  };
}
