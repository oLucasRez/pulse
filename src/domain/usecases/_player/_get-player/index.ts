import { PlayerModel } from '@domain/models';

export interface GetPlayerUsecase {
  execute(id: string): Promise<PlayerModel>;
}
