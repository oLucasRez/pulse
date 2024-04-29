import { QuestionModel } from '@domain/models';

export interface IVoteQuestionFactUsecase {
  execute(id: string, answerID: string | null): Promise<QuestionModel>;
}
