import { GameModel } from '@domain/models';

export interface IStartVotingUsecase {
  execute(answerID: string): Promise<GameModel>;
}
