import { DiceModel } from '@domain/models';

export interface IGetDicesUsecase {
  execute(): Promise<DiceModel[]>;
}
