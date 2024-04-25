import { RoundModel } from '@domain/models';

export interface IGetLightSpotRoundUsecase {
  execute(): Promise<RoundModel | null>;
}
