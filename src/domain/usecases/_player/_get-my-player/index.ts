import { PlayerModel } from '@domain/models';

export interface IGetMyPlayerUsecase {
  execute(): Promise<PlayerModel | null>;
}
