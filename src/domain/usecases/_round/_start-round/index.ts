import { RoundModel } from '@domain/models';

export interface StartRoundUsecase {
  execute(id: string, clockwise: RoundModel.Clockwise): Promise<RoundModel>;
}
