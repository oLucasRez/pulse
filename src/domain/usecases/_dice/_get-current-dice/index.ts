import { DiceModel } from '@domain/models';

export interface IGetCurrentDiceUsecase {
  execute(): Promise<DiceModel | null>;
}
