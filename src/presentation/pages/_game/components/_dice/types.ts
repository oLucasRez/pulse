import { DiceModel } from '@domain/models';

export interface DicesProps {
  transparent?: boolean;
  hidden?: string;
}

export type DiceProps = DiceModel & {
  transparent?: boolean;
  onClick?(): void;
};
