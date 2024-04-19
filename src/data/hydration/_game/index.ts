import { GameModel } from '@domain/models';

export interface IGameHydrator {
  hydrate(dto: GameModel.DTO): Promise<GameModel>;
}
