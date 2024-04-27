import { RoundModel } from '@domain/models';

export interface IPassRoundTurnUsecase {
  execute(clockwise?: RoundModel.Clockwise): Promise<RoundModel>;
}
