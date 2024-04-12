import { DiceModel } from '@domain/models';

export interface RollDiceUsecase {
  execute(id: string): Promise<DiceModel>;
}
