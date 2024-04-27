import { DiceModel } from '@domain/models';

export interface IVerifyDicesOverloadUsecase {
  execute(): Promise<DiceModel[]>;
}
