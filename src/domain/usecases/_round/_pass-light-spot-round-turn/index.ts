import { RoundModel } from '@domain/models';

export interface IPassLightSpotRoundTurnUsecase {
  execute(): Promise<RoundModel>;
}
