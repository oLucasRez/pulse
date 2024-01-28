import { GameModel } from '@domain/models';

export interface GetGameUsecase {
  execute(id: string): Promise<GameModel>;
}
