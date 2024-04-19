import { DiceModel } from '@domain/models';

export interface DicesProps {
  transparent?: boolean;
  currentHidden?: boolean;
}

export type DiceProps = DiceModel & {
  transparent?: boolean;
};
