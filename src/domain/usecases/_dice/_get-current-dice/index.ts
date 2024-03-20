import { DiceModel } from '@domain/models';

export interface GetCurrentDiceUsecase {
  execute(roundID: string): Promise<DiceModel | null>;
}
