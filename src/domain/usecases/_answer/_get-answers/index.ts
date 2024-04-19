import { AnswerModel } from '@domain/models';

export interface IGetAnswersUsecase {
  execute(): Promise<AnswerModel[]>;
}
