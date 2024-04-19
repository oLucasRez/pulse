import { QuestionModel } from '@domain/models';

export interface IQuestionHydrator {
  hydrate(dto: QuestionModel.DTO): Promise<QuestionModel>;
}
