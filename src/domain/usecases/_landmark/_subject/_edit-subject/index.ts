import { SubjectModel } from '@domain/models';

export interface IEditSubjectUsecase {
  execute(
    id: string,
    payload: IEditSubjectUsecase.Payload,
  ): Promise<SubjectModel>;
}

export namespace IEditSubjectUsecase {
  export type Payload = {
    description?: string;
  };
}
