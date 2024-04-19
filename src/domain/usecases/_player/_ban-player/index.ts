import { PlayerModel } from '@domain/models';

export interface IBanPlayerUsecase {
  execute(id: string): Promise<PlayerModel>;
}
