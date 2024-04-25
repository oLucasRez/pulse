import { RoundModel } from '@domain/models';

export interface IPassRoundTurnUsecase {
  execute(): Promise<RoundModel>;
}
