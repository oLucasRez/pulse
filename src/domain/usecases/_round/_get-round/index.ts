import { RoundModel } from '@domain/models';

export interface IGetRoundUsecase {
  execute(id: string): Promise<RoundModel | null>;
}
