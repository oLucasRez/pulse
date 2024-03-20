import { DiceModel } from '@domain/models';

export interface DiceRollerProps {
  onDiceRolled?(value: number, dice: DiceModel): void;
}
