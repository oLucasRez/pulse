import { GameModel } from '@domain/models';

export interface IGetGameUsecase {
  execute(id: string): Promise<GameModel | null>;
}
