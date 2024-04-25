import { RoundModel } from '@domain/models';

export interface IStartLightSpotRoundUsecase {
  execute(): Promise<RoundModel>;
}
