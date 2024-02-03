import { GameModel } from '@domain/models';

export interface GetGamesUsecase {
  execute(): Promise<GameModel[]>;
}
