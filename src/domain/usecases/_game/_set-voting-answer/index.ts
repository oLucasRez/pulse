import { GameModel } from '@domain/models';

export interface ISetVotingAnswerUsecase {
  execute(answerID: string): Promise<GameModel>;
}
