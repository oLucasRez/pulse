import { DiceModel } from '@domain/models';
import { Vector } from '@domain/utils';

export interface DicesProps {
  position?: Vector | null;
  transparent?: boolean;
  currentHidden?: boolean;
}

export type DiceProps = DiceModel & {
  position?: Vector | null;
  transparent?: boolean;
};
