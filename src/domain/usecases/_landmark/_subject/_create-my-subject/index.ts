import { SubjectModel } from '@domain/models';

export interface ICreateMySubjectUsecase {
  execute(payload: ICreateMySubjectUsecase.Payload): Promise<SubjectModel>;
}

export namespace ICreateMySubjectUsecase {
  export type Payload = {
    description: string;
    icon: string;
  };
}
