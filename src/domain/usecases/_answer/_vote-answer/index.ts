import { AnswerModel } from '@domain/models';

export interface IVoteAnswerUsecase {
  execute(value: boolean): Promise<AnswerModel>;
}
