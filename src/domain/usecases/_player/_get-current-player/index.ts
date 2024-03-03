import { PlayerModel } from '@domain/models';

export interface GetCurrentPlayerUsecase {
  execute(roundID: string): Promise<PlayerModel | null>;
}
