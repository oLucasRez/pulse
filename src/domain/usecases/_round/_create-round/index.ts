import { RoundModel } from '@domain/models';

export interface ICreateRoundUsecase {
  execute(): Promise<RoundModel>;
}
