import { QuestionModel } from '@domain/models';

export interface IGetQuestionsUsecase {
  execute(): Promise<QuestionModel[]>;
}
