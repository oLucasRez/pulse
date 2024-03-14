import { GameModel } from '@domain/models';

export interface NextGameStateUsecase {
  execute(): Promise<GameModel>;
}
