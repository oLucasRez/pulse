import { AnswerModel } from '@domain/models';

export interface IGetAnswerUsecase {
  execute(id: string): Promise<AnswerModel | null>;
}
