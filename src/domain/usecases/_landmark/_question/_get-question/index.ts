import { QuestionModel } from '@domain/models';

export interface IGetQuestionUsecase {
  execute(id: string): Promise<QuestionModel | null>;
}
