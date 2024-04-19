import { PlayerModel } from '@domain/models';

export interface IPlayerHydrator {
  hydrate(dto: PlayerModel.DTO): Promise<PlayerModel>;
}
