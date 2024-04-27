import { DiceModel } from '@domain/models';

export interface IResetDiceOverloadUsecase {
  execute(id: string): Promise<DiceModel>;
}
