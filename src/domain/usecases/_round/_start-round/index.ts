import { RoundModel } from '@domain/models';

export interface IStartRoundUsecase {
  execute(clockwise: RoundModel.Clockwise): Promise<RoundModel>;
}
