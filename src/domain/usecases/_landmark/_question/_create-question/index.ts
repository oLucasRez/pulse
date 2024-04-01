import { QuestionModel } from '@domain/models';

export interface CreateQuestionUsecase {
  execute(payload: CreateQuestionUsecase.Payload): Promise<QuestionModel>;
}

export namespace CreateQuestionUsecase {
  export type Payload = {
    description: string;
    subjectIDs: string[];
  };
}
