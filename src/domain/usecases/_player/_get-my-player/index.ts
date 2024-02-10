import { PlayerModel } from '@domain/models';

export interface GetMyPlayerUsecase {
  execute(): Promise<PlayerModel | null>;
}
