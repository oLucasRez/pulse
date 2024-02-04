import { GameModel } from '@domain/models';

export interface StartGameUsecase {
  execute(): Promise<GameModel>;
}
