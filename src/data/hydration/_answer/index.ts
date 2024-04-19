import { AnswerModel } from '@domain/models';

export interface IAnswerHydrator {
  hydrate(dto: AnswerModel.DTO): Promise<AnswerModel>;
}
