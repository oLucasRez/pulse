import { Vector } from '@utils';

import { CentralFact } from '../..';
import { Pulse } from '../model';

export class CentralPulse extends Pulse<CentralFact> {
  public constructor(props: CentralPulse.NewProps) {
    const {
      amount = 0,
      landmark = new CentralFact({ description: '' }),
      ...pulseProps
    } = props;

    const origin = Vector(0, 0);
    const gap = 1;

    super({ ...pulseProps, origin, gap, amount, landmark });
  }

  public updateAmount(amount: CentralPulse['amount']): void {
    this.amount = amount;
  }
}

export namespace CentralPulse {
  export type NewProps = Omit<
    Pulse.NewProps<CentralFact>,
    'origin' | 'gap' | 'amount' | 'landmark'
  > & {
    amount?: CentralPulse['amount'];
    landmark?: CentralPulse['landmark'];
  };
}
