import { QuestionModel } from '@domain/models';

export interface ISetQuestionFactUsecase {
  execute(answerID: string): Promise<QuestionModel>;
}
