import { RoundModel } from '@domain/models';

export interface IStartRoundUsecase {
  execute(id: string, clockwise: RoundModel.Clockwise): Promise<RoundModel>;
}
