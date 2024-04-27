import { DiceModel } from '@domain/models';
import { Vector } from '@domain/utils';

export type RollDiceEvent = { position: Vector };

export interface DiceRollerProps {
  dice: DiceModel;
  onRollDice?(event: RollDiceEvent): void;
}
