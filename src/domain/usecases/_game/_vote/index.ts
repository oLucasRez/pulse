import { GameModel } from '@domain/models';

export interface IVoteUsecase {
  execute(playerID: string, value: boolean): Promise<GameModel>;
}
