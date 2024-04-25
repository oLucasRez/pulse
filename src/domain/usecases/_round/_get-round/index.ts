import { RoundModel } from '@domain/models';

export interface IGetRoundUsecase {
  execute(): Promise<RoundModel | null>;
}
