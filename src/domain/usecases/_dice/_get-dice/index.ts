import { DiceModel } from '@domain/models';

export interface IGetDiceUsecase {
  execute(id: string): Promise<DiceModel | null>;
}
