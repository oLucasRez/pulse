import { SubjectModel } from '@domain/models';

export interface IChangeSubjectUsecase {
  execute(
    id: string,
    payload: IChangeSubjectUsecase.Payload,
  ): Promise<SubjectModel>;
}

export namespace IChangeSubjectUsecase {
  export type Payload = {
    description?: string;
  };
}
