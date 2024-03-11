import { SubjectModel } from '@domain/models';

export interface CreateMySubjectUsecase {
  execute(payload: CreateMySubjectUsecase.Payload): Promise<SubjectModel>;
}

export namespace CreateMySubjectUsecase {
  export type Payload = {
    description: string;
    icon: string;
  };
}
