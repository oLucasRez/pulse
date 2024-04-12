import { DiceModel } from '@domain/models';

export interface IGetCurrentDiceUsecase {
  execute(roundID: string): Promise<DiceModel | null>;
}
