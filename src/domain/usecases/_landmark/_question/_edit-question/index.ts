import { QuestionModel } from '@domain/models';

export interface IEditQuestionUsecase {
  execute(
    id: string,
    payload: IEditQuestionUsecase.Payload,
  ): Promise<QuestionModel>;
}

export namespace IEditQuestionUsecase {
  export type Payload = {
    description?: string;
  };
}
