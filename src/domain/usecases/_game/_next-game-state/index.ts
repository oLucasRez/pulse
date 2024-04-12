import { GameModel } from '@domain/models';

export interface INextGameStateUsecase {
  execute(): Promise<GameModel>;
}
