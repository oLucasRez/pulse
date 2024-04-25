import { PlayerModel } from '@domain/models';

export interface IGetCurrentLightSpotPlayerUsecase {
  execute(): Promise<PlayerModel | null>;
}
