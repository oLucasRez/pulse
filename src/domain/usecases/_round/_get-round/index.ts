import { RoundModel } from '@domain/models';

export interface GetRoundUsecase {
  execute(id: string): Promise<RoundModel | null>;
}
