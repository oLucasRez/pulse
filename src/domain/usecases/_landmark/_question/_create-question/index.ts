import { QuestionModel } from '@domain/models';

export interface ICreateQuestionUsecase {
  execute(payload: ICreateQuestionUsecase.Payload): Promise<QuestionModel>;
}

export namespace ICreateQuestionUsecase {
  export type Payload = {
    description: string;
    subjectIDs: string[];
  };
}
