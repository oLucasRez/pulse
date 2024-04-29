import { QuestionModel } from '@domain/models';

export interface IExpireQuestionVotesUsecase {
  execute(id: string): Promise<QuestionModel>;
}
