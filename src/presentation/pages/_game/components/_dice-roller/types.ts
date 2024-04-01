import { DiceModel } from '@domain/models';
import { Vector } from '@domain/utils';

export type RollDiceEvent = { dice: DiceModel; position: Vector };

export interface DiceRollerProps {
  onRollDice?(event: RollDiceEvent): void;
}
