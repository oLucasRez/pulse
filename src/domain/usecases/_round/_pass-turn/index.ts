import { RoundModel } from '@domain/models';

export interface PassTurnUsecase {
  execute(id: string): Promise<RoundModel>;
}
