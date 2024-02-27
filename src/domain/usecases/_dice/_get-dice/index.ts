import { DiceModel } from '@domain/models';

export interface GetDiceUsecase {
  execute(id: string): Promise<DiceModel | null>;
}
