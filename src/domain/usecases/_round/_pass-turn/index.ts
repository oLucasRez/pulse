import { RoundModel } from '@domain/models';

export interface IPassTurnUsecase {
  execute(id: string): Promise<RoundModel>;
}
