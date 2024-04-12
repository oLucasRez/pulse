import { GameModel } from '@domain/models';

export interface IGetGamesUsecase {
  execute(): Promise<GameModel[]>;
}
