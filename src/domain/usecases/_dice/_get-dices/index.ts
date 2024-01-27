import { DiceModel } from '@domain/models';

export interface GetDicesUsecase {
  execute(): Promise<DiceModel[]>;
}
