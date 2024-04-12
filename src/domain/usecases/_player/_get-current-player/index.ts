import { PlayerModel } from '@domain/models';

export interface IGetCurrentPlayerUsecase {
  execute(roundID: string): Promise<PlayerModel | null>;
}
