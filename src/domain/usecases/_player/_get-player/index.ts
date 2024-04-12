import { PlayerModel } from '@domain/models';

export interface IGetPlayerUsecase {
  execute(id: string): Promise<PlayerModel | null>;
}
