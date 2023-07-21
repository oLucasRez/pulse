import { Vector } from '@utils';

import { CentralFact } from '..';
import { Pulse } from './pulse';

export class CentralPulse extends Pulse<CentralFact> {
  public get centralFact(): CentralFact {
    return this.landmark;
  }

  public constructor(props: CentralPulse.ConstructorProps) {
    const { amount = 0, ...pulseProps } = props;

    const origin = Vector(0, 0);
    const landmark = new CentralFact({ description: '', position: origin });

    super({ ...pulseProps, origin, gap: 1, amount, landmark });
  }

  public updateAmount(value: number): void {
    super.updateAmount(value);
  }

  public toString(): string {
    return `\x1b[37m[CentralPulse(${this.amount})]\x1b[0m`;
  }
}

export namespace CentralPulse {
  export type ConstructorProps = Omit<
    Pulse.ConstructorProps<CentralFact>,
    'origin' | 'gap' | 'amount' | 'landmark'
  > & {
    amount?: number;
  };
}
